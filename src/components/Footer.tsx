"use client";

import React from 'react'
import {SiLinkedin, SiGithub, SiGmail} from 'react-icons/si';
import {IconType} from "react-icons";
import {GiSmartphone} from "react-icons/gi";
import Image from "next/image"

const ICON_MAP: {[key: string]: IconType} = {
    email: SiGmail,
    linkedin: SiLinkedin,
    github: SiGithub,
    phone: GiSmartphone,
};

const contactInfo = [
    {platform: "email", url: "mailto:jonathanvallejo777@gmail.com", text: "jonathanvallejo777@gmail.com"},
    {platform: "phone", url: "tel:+14086305003", text: "+14086305003"},
];

const socialLinks = [
    {platform: "linkedin", url:"https://www.linkedin.com/in/jonathan-vallejo/"},
    {platform: "github", url:"https://github.com/jvallejoromero"},
    {platform: "email", url:"mailto:jonathanvallejo777@gmail.com"},
    {platform: "phone", url:"tel:+14086305003"},
];

const navLinks = [
    {href: "#about", label: "About"},
    {href: "#projects", label: "Projects"},
    {href: "#contact", label: "Contact"},
];

const Footer = () => {
    return (
        <footer className="bg-background mt-25 border-t bg-gradient-to-b dark:bg-gradient-to-t from-white to-neutral-100 border-neutral-400/10 dark:from-black dark:to-neutral-950">
            <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 py-8 px-4 space-y-5 md:space-y-0">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        {/* React logo + link */}
                        <a
                            href="https://reactjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="React"
                        >
                            <Image
                                src="/react-logo.svg"
                                alt="React logo"
                                width={24}
                                height={24}
                                className="inline-block"
                            />
                        </a>

                        {/* Next.js logo + link */}
                        <a
                            href="https://nextjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Next.js"
                        >
                            <Image
                                src="/next.svg"
                                alt="Next.js logo"
                                width={100}
                                height={24}
                                className="inline-block dark:invert"
                            />
                        </a>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Built with React and Next.js </p>
                        <p className="text-sm text-muted-foreground">Based in San Jose, CA 🏡</p>
                    </div>
                </div>

                <div className="hidden lg:flex"></div>

                {/* Social Links */}
                <div>
                    <nav aria-label="Contact Information">
                        <ul className="flex space-x-4">
                            {socialLinks.map(({platform, url}, index) => {
                                const IconComponent = ICON_MAP[platform.toLowerCase()];

                                return (
                                    <li key={index}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={platform}
                                        >
                                            {IconComponent ? <IconComponent size={24}/> : null}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="mt-2 space-y-0">
                            {contactInfo.map(({platform, url, text}, index) => {
                                return (
                                    <li key={index}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={platform}
                                        >
                                            <p className="text-sm">{text}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                {/* Quick Links */}
                <div>
                    <nav aria-label="Footer navigation">
                        <h4 className="mb-1 md:hidden">Quick Links</h4>
                        <ul className="space-y-2">
                            {navLinks.map(({href, label}) => (
                                <li key={href}>
                                    <a href={href} className="hover:underline">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="border-t border-neutral-400/10">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between pt-4 pb-5 px-4">
                    <p className="text-xs">&copy; {new Date().getFullYear()} Jonathan Vallejo. All rights reserved.</p>
                    <a href="#top" className="mt-2 md:mt-0 text-xs hover:underline">
                        Back to top ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;