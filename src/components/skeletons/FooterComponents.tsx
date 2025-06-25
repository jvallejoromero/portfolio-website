import React from "react";
import {IconType} from "react-icons";
import {SiGithub, SiGmail, SiLinkedin} from "react-icons/si";
import {GiSmartphone} from "react-icons/gi";
import Image from "next/image";
import GenericButton from "@/components/buttons/GenericButton";

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
    {platform: "github", url:"https://github.com/jvallejoromero"},
    {platform: "linkedin", url:"https://www.linkedin.com/in/jonathan-vallejo/"},
    {platform: "email", url:"mailto:jonathanvallejo777@gmail.com"},
    {platform: "phone", url:"tel:+14086305003"},
];

const navLinks = [
    {href: "#about", label: "About"},
    {href: "#projects", label: "Projects"},
    {href: "#contact", label: "Contact"},
];

export const ReactLogo = () => {
    return (
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
    );
}

export const NextLogo = () => {
    return (
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
    );
}


export const SocialIcon = ({ platform, url }: { platform: string, url: string }) =>{
    const IconComponent = ICON_MAP[platform.toLowerCase()];

    return (
        <li>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
            >
                {IconComponent ? <IconComponent size={24} className="inline-block transform transition-transform hover:scale-105" /> : null}
            </a>
        </li>
    );
}

export const QuickLink = ({ href, label }: { href: string, label: string }) => {
    return (
        <li key={href}>
            <a href={href} className="hover:underline">
                {label}
            </a>
        </li>
    );
}

export const ContactText = ({ platform, url, text }: { platform: string, url: string, text: string }) =>{
    return (
        <li>
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
}

export const GeneralInformation = () => {
    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <ReactLogo />
                <NextLogo />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Built with React and Next.js </p>
                <p className="text-sm text-muted-foreground">Based in San Jose, CA 🏡</p>
            </div>
        </div>
    );
}

export const ResumeCTA = () => (
    <div className="space-y-2">
        <h4>
            Want a copy of my resume?
        </h4>
        <a
            href="/files/resume.pdf"
            download="Jonathan_Vallejo_Resume.pdf"
            className="inline-block"
        >
            <GenericButton label="Download Resume" className="px-3 py-2 text-xs" />
        </a>
    </div>
);

export const SocialLinks = () => {
    return (
        <div>
            <nav aria-label="Contact Information">
                <ul className="flex space-x-4">
                    {socialLinks.map(({platform, url}, index) => (
                        <SocialIcon key={index} platform={platform} url={url} />
                    ))}
                </ul>
                <ul className="mt-2 space-y-0">
                    {contactInfo.map(({platform, url, text}, index) => (
                        <ContactText key={index} platform={platform} url={url} text={text} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export const NavigationLinks = () => {
    return (
        <div>
            <nav aria-label="Footer navigation">
                <h4 className="mb-1 sm:hidden xl:flex">Quick Links</h4>
                <ul className="space-y-2 flex flex-row gap-2">
                    {navLinks.map(({ href, label }, index) => (
                        <QuickLink key={index} href={href} label={label} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export const CopyrightInformation = () => {
    return (
        <div className="border-t border-neutral-400/10">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between pt-10 pb-5 px-4">
                <p className="order-2 md:order-1 mt-2 md:mt-0 text-xs">&copy; {new Date().getFullYear()} Jonathan Vallejo. All rights reserved.</p>
                <a href="#top" className="order-1 md:order-2 text-xs hover:underline">
                    Back to top ↑
                </a>
            </div>
        </div>
    );
}

export const GenericFooterLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 pt-8 pb-12 px-8 xl:px-4 gap-x-8 gap-y-6">
            {children}
        </div>
    );
}

export const GenericFooter = ( { children }: { children: React.ReactNode }) => {
    return (
        <footer id="footer" className="bg-background mt-20 border-t bg-gradient-to-b dark:bg-gradient-to-t from-white to-neutral-100 border-neutral-400/10 dark:from-black dark:to-neutral-950">
            {children}
        </footer>
    );
}