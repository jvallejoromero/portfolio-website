import { z } from "zod";
import { env } from "@/lib/env";

import Mailjet from "node-mailjet";
import {NextResponse} from "next/server";
import { contactFormLimiter } from "@/lib/rate-limit";
import sanitizeHtml from 'sanitize-html';
import {randomId} from "@/lib/utils";

const mj = Mailjet.apiConnect(env.MAILJET_API_KEY!, env.MAILJET_SECRET_KEY!);

const stripTags = (input: string): string => {
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
    });
}

const escapeEntities = (str: string): string => {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const removeLineBreaks = (str: string): string => {
    return str.replace(/(\r\n|\n|\r)/g, " ");
}

const sanitizePlainText = (string: string): string => {
    const noTags = stripTags(string);
    const escaped = escapeEntities(noTags);
    return removeLineBreaks(escaped);
}



// define and validate incoming shape
const ContactFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(10, { message: "Please enter at least 15 characters." })
                       .max(2000, { message: "Message can't exceed 2000 characters." }),
    recaptchaToken: z.string(),
    _gotcha: z.string().optional(),
});

const verifyRecaptcha = async(token: string) => {
    const secret = env.GOOGLE_RECAPTCHA_SECRET_KEY!;
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
    });
    return await res.json() as Promise<{ success: boolean; score: number }>;
}

export const POST = async(req: Request) => {
    // rate limit check
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "unknown";

    const { success: rateSuccess, remaining, limit, reset } = await contactFormLimiter.limit(ip);

    if (!rateSuccess) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);

        return NextResponse.json(
            { error: "Too many requests. Please try again later."},
            {
                status: 429,
                headers: {
                    "Retry-After": String(retryAfter),
                    "RateLimit-Limit": String(limit),
                    "RateLimit-Remaining": String(remaining),
                    "RateLimit-Reset": String(Math.floor(reset / 1000)),
                },
            }
        );
    }

    // payload size check
    const raw = await req.text();
    const MAX_BODY = 15_000;

    if (raw.length > MAX_BODY) {
        return NextResponse.json(
            { error: `Payload too large (max ${MAX_BODY} bytes).`},
            { status: 413 }
        );
    }

    let body: unknown;
    try  {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ error: "Invalid JSON "}, { status: 400});
    }

    const parsed = ContactFormSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten().formErrors.join(", ") },
            { status: 400 }
        );
    }

    const { name, email, message, recaptchaToken, _gotcha } = parsed.data;

    // sanitize values
    const sanitizedName = sanitizePlainText(name);
    const sanitizedEmail = sanitizePlainText(email);
    const sanitizedMessage = sanitizePlainText(message);

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
                    Email: env.FORM_SENDER_EMAIL,
                    Name: "My Portfolio Website",
                },
                To: [
                    {
                        Email: env.FORM_INBOX_EMAIL,
                        Name: "Contact Form",
                    },
                ],
                ReplyTo: {
                    Email: sanitizedEmail,
                    Name: sanitizedName,
                },
                Subject: `New message from ${sanitizedName} [#${randomId()}]`,
                TextPart: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\n${sanitizedMessage}`,
                HTMLPart:
                    `
                    <h4>You received a new message from ${sanitizedName}</h4> 
                    <p><strong>Reply To:</strong> ${sanitizedEmail}</p> 
                    <div>${sanitizedMessage.replace(/\n/g, "<br/>")}</div>
                    `
                ,
            },
        ],
    };
    
    try {
        await mj.post("send", { version: "v3.1" }).request(request);

        return NextResponse.json({ message: "Sent" }, { status: 200 });
    } catch (err) {
        console.error("Mailjet error:", err);
        return NextResponse.json(
            { error: err },
            { status: 500 }
        );
    }
}