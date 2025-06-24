"use client";

import React, {useState, useEffect, useRef, useMemo} from "react";
import {Home, Mail, User, FileText, MessageSquare} from "lucide-react";
import {CgCodeSlash} from "react-icons/cg";
import {SiGithub, SiLinkedin} from "react-icons/si";
import {useTheme} from "next-themes";
import {
    DesktopNavbarContents,
    DesktopNavbarLayout, MobileNavbarContents,
    MobileNavbarContainer,
    MobileNavButton,
} from "./NavbarComponents";

import type { NavbarEntry } from "./NavbarComponents";

const navLinks: NavbarEntry[] = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/#about", label: "About", Icon: User },
    { href: "/#projects", label: "Projects", Icon: CgCodeSlash },
    { href: "/#contact", label: "Contact", Icon: MessageSquare },
    { href: "https://github.com/jvallejoromero", label: "Github", Icon: SiGithub },
    { href: "https://www.linkedin.com/in/jonathan-vallejo", label: "LinkedIn", Icon: SiLinkedin },
    { href: "mailto:jonathanvallejo777@gmail.com", label: "Email", Icon: Mail },
    { href: "/files/resume.pdf", label: "Resume", Icon: FileText, download: "Jonathan_Vallejo_Resume.pdf"},
];

const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const scrollTimeout = useRef<number | null>(null);

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setIsScrolling(true);

            if (scrollTimeout.current) {
                window.clearTimeout(scrollTimeout.current);
            }

            scrollTimeout.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
        };
    }, []);

    const reversedLinks = useMemo(() => [...navLinks].reverse(), []);

    const MemoizedDesktopContents = React.useMemo(
        () => (
            <DesktopNavbarContents items={navLinks} mounted={mounted} isDark={isDark} />
        ),
        [navLinks, mounted, isDark]
    );

    const MemoizedMobileContents = React.useMemo(
        () => (
            <>
                <MobileNavButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
                <MobileNavbarContents items={reversedLinks} mounted={mounted} isDark={isDark} isOpen={isOpen} />
            </>
        ),
        [reversedLinks, mounted, isOpen, isDark]
    );

    return (
        <>
            {/* Desktop Navbar */}
            <DesktopNavbarLayout showNav={!isScrolling}>
                {MemoizedDesktopContents}
            </DesktopNavbarLayout>

            {/* Mobile Navbar */}
            <MobileNavbarContainer showNav={!isScrolling}>
                {MemoizedMobileContents}
            </MobileNavbarContainer>
        </>
    );
}

export default Navbar;