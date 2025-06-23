"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {Home, Info, Folder, Mail, DownloadCloud } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "/", label: "Home", Icon: Home },
        { href: "/#about", label: "About", Icon: Info },
        { href: "/#projects", label: "Projects", Icon: Folder },
        { href: "/#contact", label: "Contact", Icon: Mail },
        { href: "/files/resume.pdf", label: "Resume", Icon: DownloadCloud },
    ];

    return (
        <nav
            className={`fixed w-full top-0 z-50 ${!scrolled && "hidden"}`}
        >
            <div
                className="mx-auto w-max mt-3 px-8 py-4 flex items-center justify-center
                            bg-gradient-to-r from-black/80 via-neutral-900/70 to-black/80
                            border-b border-neutral-300/10 rounded-full"
            >

                {/* Desktop links */}
                <ul className="hidden md:flex space-x-8">
                    {links.map(({ href, Icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="flex items-center text-sm text-gray-300
                                         hover:text-cyan-400 transition-colors duration-200"
                            >
                                <Icon className="w-5 h-5" />
                            </Link>
                        </li>
                    ))}

                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;