import { z } from "zod";

const EnvSchema = z.object({
    MAILJET_API_KEY: z.string().nonempty(),
    MAILJET_SECRET_KEY: z.string().nonempty(),
    GOOGLE_RECAPTCHA_SECRET_KEY: z.string().nonempty(),
    FORM_SENDER_EMAIL: z.string().email(),
    FORM_INBOX_EMAIL: z.string().email(),
    UPSTASH_REDIS_REST_URL: z.string().nonempty(),
    UPSTASH_REDIS_REST_TOKEN: z.string().nonempty(),
});

export const env = EnvSchema.parse(process.env);
export type Env = typeof env;