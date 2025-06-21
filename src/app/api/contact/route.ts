import { z } from "zod";
import Mailjet from "node-mailjet";
import {NextResponse} from "next/server";

const mj = Mailjet.apiConnect(process.env.MAILJET_API_KEY!, process.env.MAILJET_SECRET_KEY!);

// define and validate incoming shape
const ContactFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(15, { message: "Please enter at least 15 characters." }),
    recaptchaToken: z.string(),
    _gotcha: z.string().optional(),
});

const verifyRecaptcha = async(token: string) => {
    const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY!;
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
    });
    return await res.json() as Promise<{ success: boolean; score: number }>;
}

export const POST = async(req: Request) => {
    const body = await req.json();

    const parsed = ContactFormSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten().formErrors.join(", ") },
            { status: 400 }
        );
    }

    const { name, email, message, recaptchaToken, _gotcha } = parsed.data;

    // honeypot spam check
    if (_gotcha) {
        return NextResponse.json(null, { status: 200 });
    }

    const { success, score } = await verifyRecaptcha(recaptchaToken);
    if (!success || score < 0.5) {
        return NextResponse.json(
            { error: "reCAPTCHA verification failed" },
            { status: 400 }
        );
    }

    // send email
    const request = {
        Messages: [
            {
                From: {
                    Email: process.env.FORM_SENDER_EMAIL,
                    Name: "Contact Form",
                },
                To: [
                    {
                        Email: process.env.FORM_INBOX_EMAIL,
                        Name: 'Contact Form',
                    },
                ],
                ReplyTo: {
                    Email: email,
                    Name: name,
                },
                Subject: `New message from ${name}`,
                TextPart: `Name: ${name}\nEmail: ${email}\n\n${message}`,
                HTMLPart:
                    `
                    <h2>New message from ${name}</h2> <p><strong>Email:</strong> ${email}</p> 
                    <p>${message.split("\n").map((line) => `<div>${line}</div>`).join("")}</p>
                    `
                ,
            },
        ],
    };
    
    try {
        const result = await mj
            .post("send", { version: "v3.1" })
            .request(request);

        console.log(result.body);
        return NextResponse.json({ message: "Sent" }, { status: 200 });
    } catch (err) {
        console.error("Mailjet error:", err);
        return NextResponse.json(
            { error: err },
            { status: 500 }
        );
    }
}