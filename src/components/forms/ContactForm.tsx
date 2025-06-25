"use client";

import React, {useEffect, useState} from "react";
import {FieldError, SubmitHandler, useForm, UseFormRegister} from "react-hook-form";
import Script from "next/script";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import {useToast} from "@/hooks/ToastHook";
import {AnimatePresence, motion} from "framer-motion";
import {FiCheckCircle, FiXCircle} from "react-icons/fi";

interface ContactFormInputs {
    name: string;
    email: string;
    message: string;
    _gotcha?: string;
}

type FormInputProps = {
    id: "name" | "email" | "message" | "_gotcha";
    register: UseFormRegister<ContactFormInputs>;
    required?: boolean;
    isEmailInput?: boolean;
    placeholder?: string;
    error?: FieldError;
}

type FormStatus = {
    message: string;
    success: boolean;
};

const getRecaptchaSiteKey = (): string => {
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!key) {
        throw new Error("Recaptcha site key is missing!");
    }
    return key;
}

const capitalize = (str: string): string => {
    if (str.length === 0) return "";
    const first = str.charAt(0).toUpperCase();
    const rest  = str.slice(1);
    return first + rest;
}

const FormField = ({ id, required, placeholder, isEmailInput, error, register }: FormInputProps) => {
    return (
        <div className="flex flex-col">
            <FormLabel id={id} />
            <FormInput id={id} required={required} placeholder={placeholder} isEmailInput={isEmailInput} error={error} register={register} />
        </div>
    );
}

const FormLabel = ({ id }: { id: string }) => {
    return (
        <label htmlFor={id} className="mb-2 text-sm font-semibold dark:text-neutral-300">
            {capitalize(id)}
        </label>
    );
}

const FormInput = ({ id, placeholder, required=true, isEmailInput, error, register}: FormInputProps) => {
    const { toast, showToast } = useToast(3000);

    useEffect(() => {
        if (error?.message) {
            if (toast) {
                return;
            }
            showToast(error.message);
        }
    }, [error, showToast]);

    return (
        <div className="relative">
            <input
                id={id}
                type={isEmailInput ? "email" : "text"}
                {...register(id, {
                    required: required ? `${capitalize(id)} is required`: undefined,
                    pattern: isEmailInput ? {value: /^\S+@\S+\.\S+$/,message: "Please enter a valid email address!"} : undefined,
                })}
                className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder={placeholder ?? (isEmailInput ? "you@example.com" : capitalize(id))}
            />
            {toast && (
                <FormErrorMessage error={toast} />
            )}
        </div>
    );
}

const FormMessageField = ({ register, error }: { register: UseFormRegister<ContactFormInputs>, error?: FieldError }) => {
    const { toast, showToast } = useToast(3000);

    useEffect(() => {
        if (error?.message) {
            if (toast) {
                return;
            }
            showToast(error.message);
        }
    }, [error, showToast]);

    return (
        <div className="flex flex-col relative">
            <FormLabel id={"message"} />
            <textarea
                id="message"
                {...register("message", {
                    required: "Message is required",
                    minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                    },
                })}
                className="w-full h-32 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                placeholder="How can I help you?"
            />
            {toast && (
                <FormErrorMessage error={toast} />
            )}
        </div>
    );
}

const FormErrorMessage = ({ error }: { error: string }) => {
    return(
        <AnimatePresence>
            {error && (
                <motion.div
                    key="toast"
                    initial={{ y: -20, opacity: 0, scale: 0.8, rotate: -5, filter: "blur(4px)" }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotate: [ -5, 5, -3, 3, 0 ],
                        filter: "blur(0px)",
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            bounce: 0.5,
                            rotate: { duration: 0.6, ease: "easeInOut" },
                        },
                    }}
                    exit={{
                        y: -10,
                        opacity: 0,
                        scale: 0.8,
                        filter: "blur(4px)",
                        transition: { duration: 0.2 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute right-0 top-full mt-1 lg:mt-2 bg-red-600 text-white text-[10px] xs:text-xs sm:text-sm px-3 py-1 rounded shadow-lg z-20"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const GoogleReCaptchaInfo = () => {
    return (
        <div className="text-[10px] text-muted-foreground">
            <span>This site is protected by reCAPTCHA and the </span>
            <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Privacy Policy"
                className="text-neutral-800 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 hover:underline"
            >
                Google Privacy Policy
            </a>
            <span> and </span>
            <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Terms of Service"
                className="text-neutral-800 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 hover:underline"
            >
                Terms of Service
            </a>
            <span> apply.</span>
        </div>
    );
}

const StatusMessage = (status : FormStatus) => {
    return (
        <AnimatePresence>
            <motion.div
                key={status.success ? "success" : "error"}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                className={`absolute flex items-center gap-2 right-0 -top-5 z-20 rounded-md shadow-lg
                            max-w-xs sm:max-w-sm px-3 sm:px-5 py-2 text-sm md:text-base
                           ${status.success ? "bg-green-600 border-l-4 border-green-800" : "bg-red-600 border-l-4 border-red-800"} 
                           text-white text-md`
                }
            >
                {status.message}
                {status.success ? <FiCheckCircle size={20} /> : <FiXCircle size={20} />}
            </motion.div>
        </AnimatePresence>
    );
}

const ContactForm = () => {
    const { register, handleSubmit, formState } = useForm<ContactFormInputs>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<FormStatus | null>(null);

    const { toast, showToast } = useToast(10000);

    useEffect(() => {
        if (status) {
            if (toast) {
                return;
            }
            showToast(status.message);
        }
    }, [status, showToast]);

    const onSubmit: SubmitHandler<ContactFormInputs> = async(data) => {
        setIsSubmitting(true);
        setStatus(null);

        let token: string;
        try {
            token = await window.grecaptcha.execute(
                getRecaptchaSiteKey(),
                { action: "contact_form" }
            );
        } catch {
            setStatus({
                message: "reCAPTCHA verification failed. Please refresh and try again.",
                success: false,
            });
            setIsSubmitting(false);
            return;
        }

        let res: Response;
        try {
            res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, recaptchaToken: token }),
            });
        } catch {
            setStatus({
                message: "Cannot reach server. Please try again later.",
                success: false,
            });
            setIsSubmitting(false);
            return;
        }

        if (!res.ok) {
            let errMsg = "Submission failed. Please try again.";
            try {
                const payload = await res.json();
                if (payload.error) errMsg = payload.error;
            } catch {}

            setStatus({ message: errMsg, success: false });
            setIsSubmitting(false);
            return;
        }

        setStatus({ message: "Message Sent!", success: true });
        setIsSubmitting(false);
    }

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${getRecaptchaSiteKey()}`}
                strategy="lazyOnload"
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="relative flex flex-col p-4 sm:p-6 lg:p-8 gap-6 bg-background border rounded-sm shadow-md max-w-xl w-full sm:max-w-lg lg:max-w-xl mx-auto"
            >

                {/* Name Field */}
                <FormField id={"name"} placeholder={"Your name"} error={formState.errors.name} register={register} />

                {/* Email Field */}
                <FormField id={"email"} placeholder={"you@example.com"} isEmailInput={true} error={formState.errors.email} register={register} />

                {/* Message Field */}
                <FormMessageField error={formState.errors.message} register={register} />

                {/* Honeypot Field (Hidden) */}
                <input type="text" {...register("_gotcha")} className="hidden" />

                {/* Submit Button */}
                <AnimatedButton
                    isSubmitting={isSubmitting}
                    label={"Send message"}
                    sendingMessage={"Sending.."}
                    hoverMessage={"Send! ✈️"}
                    incomplete={!formState.isValid}
                    className="w-full sm:w-auto "
                />

                {/* ReCAPTCHA Info */}
                <GoogleReCaptchaInfo />

                {toast && status &&(
                    <StatusMessage message={status.message} success={status.success} />
                )}
            </form>
        </>
    );
}

export default ContactForm;