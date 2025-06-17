import { cn } from "@/lib/utils";
import React from "react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {SiGithub, SiLinkedin} from "react-icons/si";

export function GridBackground() {
    return (
        <div className="relative flex h-[100dvh] w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "z-0",
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />

            {/* Radial gradients for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent dark:from-black"/>

            <div className="flex flex-col justify-center items-center">
                <BlurText
                    text="Jonathan Vallejo"
                    delay={25}
                    animateBy="words"
                    direction="bottom"
                    className="bg-gradient-to-b from-neutral-400 to-black dark:from-neutral-100 dark:to-neutral-500 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl overflow-visible leading-normal"
                />
                <BlurText
                    delay={275}
                    direction="bottom"
                    text="Full-Stack Developer &amp; React Enthusiast"
                    className="text-md sm:text-xl text-black dark:text-muted-foreground"
                />
                <div className="absolute z-10 inset-x-0 bottom-17 sm:bottom-22 md:bottom-25 flex justify-center gap-5 opacity-0 animate-fade-slide-smooth animate-delay-2800">
                    <a
                        href="https://github.com/jvallejoromero"
                        aria-label="GitHub"
                        className="hover:text-primary transition"
                    >
                        <SiGithub className="w-6 h-6" />
                    </a>
                    <a
                        href="https://linkedin.com/in/jonathan-vallejo"
                        aria-label="LinkedIn"
                        className="hover:text-primary transition"
                    >
                        <SiLinkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
}