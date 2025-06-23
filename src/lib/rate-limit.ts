import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import {env} from "@/lib/env";

const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const contactFormLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "120 s"),
    analytics: true,
});