import React from "react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {SiGithub, SiLinkedin} from "react-icons/si";
import {HiChevronDown} from "react-icons/hi";
import GradientBackground from "./GradientBackground";

const HeroSection = () => {
    return (
        <GradientBackground>
            {/* Main Name Section */}
            <div className="flex flex-col justify-center items-center">
                <BlurText
                    text="Jonathan Vallejo"
                    delay={25}
                    animateBy="words"
                    direction="bottom"
                    className="bg-gradient-to-b text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(3rem,6vw,6rem)] from-neutral-400 to-black dark:from-neutral-100 dark:to-neutral-500 bg-clip-text font-bold text-transparent overflow-visible leading-normal"
                />
                <BlurText
                    delay={275}
                    direction="bottom"
                    text="Full-Stack Developer &amp; React Enthusiast"
                    className="text-[clamp(0.875rem,3vw,1.25rem)] text-black dark:text-muted-foreground"
                />

                {/* Social Links */}
                <div className="absolute z-10 inset-x-0 bottom-17 sm:bottom-22 md:bottom-25 flex md:hidden justify-center gap-5 opacity-0 animate-fade-slide-smooth animate-delay-2800">
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

                {/* Scroll Indicator */}
                <div className="hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:flex md:hidden flex-col items-center">
                    <span className="sr-only">Scroll down</span>
                    <HiChevronDown
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-600 dark:text-gray-300 animate-bounce"
                    />
                </div>
            </div>
        </GradientBackground>
    );
}

export default HeroSection;