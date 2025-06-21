"use client";

import React, {useEffect, useState} from "react";
import {FieldError, SubmitHandler, useForm, UseFormRegister} from "react-hook-form";
import Script from "next/script";
import AnimatedButton from "@/components/AnimatedButton";
import {useToast} from "@/hooks/ToastHook";
import {AnimatePresence, motion} from "framer-motion";

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
    const {toast, showToast } = useToast(3000);

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
    const {toast, showToast } = useToast(3000);

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
                        value: 15,
                        message: "Message must be at least 15 characters",
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

const ContactForm = () => {
    const { register, handleSubmit, formState } = useForm<ContactFormInputs>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<ContactFormInputs> = async(data) => {
        setIsSubmitting(true);

        const token = await window.grecaptcha.execute(
            getRecaptchaSiteKey(),
            { action: "contact_form" }
        );

        const payload = { ...data, recaptchaToken: token };

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("✅ Message sent!");
        } else {
            const err = await res.json();
            alert("❌ " + (err.error || "Submission failed"));
        }
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
                className="flex flex-col p-4 sm:p-6 lg:p-8 gap-6 bg-background border rounded-sm shadow-md max-w-xl w-full mx-auto
                           sm:max-w-lg lg:max-w-xl"
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
            </form>
        </>
    );
}

export default ContactForm;