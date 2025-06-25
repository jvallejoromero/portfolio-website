import {motion, Variants} from "framer-motion";
import React from "react";
import {Menu, X} from "lucide-react";
import ThemeToggleButton from "@/components/buttons/ThemeToggleButton";
import {IconType} from "react-icons";
import Link from "next/link";

export type NavbarEntry = {
    href: string;
    label: string;
    Icon: IconType;
    download?: string;
}

const hoverVariants: Variants = {
    hover: {
        scale: 1.4,
        rotate: 15,
        y: -4,
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 20,
        },
    },
    tap: { scale: 0.85 },
};

export const NavbarTooltip = ({ text }: { text: string }) => {
    return (
        <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 whitespace-nowrap
                                border border-neutral-300/90 shadow-md shadow-black/20 dark:border-neutral-300/20 dark:shadow-xs dark:shadow-neutral-300/10
                                bg-neutral-100 dark:bg-neutral-900 bg-opacity-80 text-xs rounded opacity-0 scale-95 pointer-events-none
                                group-hover:opacity-100 group-hover:scale-100 transition-transform duration-150 z-10 transform"
        >
            {text}
        </span>
    );
}

export const ToggleThemeNavMenuEntry = ({ isDark, isMotion, iconClassName }: { isDark: boolean, isMotion: boolean, iconClassName: string }) => {
    if (isMotion) {
        return (
            <li
                className="relative group"
            >
                <motion.div
                    className="flex items-center justify-center"
                    variants={hoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <ThemeToggleButton iconClassName={iconClassName}/>
                </motion.div>
                <NavbarTooltip text={isDark ? "Light mode" : "Dark mode"} />
            </li>
        );
    } else {
        return (
            <li className="block px-4 py-2">
                <ThemeToggleButton iconClassName={iconClassName} />
                <NavbarTooltip text={isDark ? "Light mode" : "Dark mode"} />
            </li>
        );
    }
}

export const DesktopNavbarItem = ({ entry, iconClassName }: { entry: NavbarEntry, iconClassName: string }) => {
    const MotionIcon = motion.create(entry.Icon);
    return (
        <li
            className="relative group"
        >
            {entry.download ? (
                <a
                    href={entry.href}
                    className="flex items-center text-sm hover:text-muted-foreground"
                    download={entry.download}
                >
                    <motion.div
                        className="p-2 -m-2 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2"
                        variants={hoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <MotionIcon className={iconClassName} />
                        <span className="sr-only">{entry.label}</span>
                    </motion.div>
                </a>
            ) : (
                <Link
                    href={entry.href}
                    className="flex items-center text-sm hover:text-muted-foreground"
                >
                    <motion.div
                        className="p-2 -m-2 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2"
                        variants={hoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <MotionIcon className={iconClassName} />
                        <span className="sr-only">{entry.label}</span>
                    </motion.div>
                </Link>
            )}
            <NavbarTooltip text={entry.label} />
        </li>
    );
}

export const DesktopNavbarLayout = ({ children, scrolled=true, showNav=true }: { children: React.ReactNode, scrolled?: boolean, showNav?: boolean }) => {
    return (
        <motion.nav
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: scrolled ? (showNav ? 0 : 100) : 0,
                opacity: scrolled ? (showNav ? 1 : 0.1) : 1,
            }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className={`hidden md:fixed md:block w-full bottom-0 z-50 ${!scrolled ? "hidden" : ""}`}
        >
            <motion.div
                initial={{ scale: 0.01 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                className="mx-auto w-max m-7 px-7 py-3 flex items-center justify-center
                            bg-gradient-to-r from-white/60 via-neutral-200/70 to-white/60  dark:from-black/80 dark:via-neutral-900/70 dark:to-black/80
                            shadow-xl dark:shadow-lg shadow-neutral-700/10 dark:shadow-neutral-300/10 border border-neutral-500/30 dark:border-neutral-300/20 rounded-xl"
            >
                {children}
            </motion.div>
        </motion.nav>
    );
}

export const DesktopNavbarContents = ({ items, mounted, isDark }: { items: NavbarEntry[], mounted: boolean, isDark: boolean }) => {
    return (
        <ul className="hidden md:flex space-x-8">
            {items.map((entry, index) => (
                <DesktopNavbarItem key={index} entry={entry} iconClassName={"w-4 h-4"} />
            ))}

            {mounted && (
                <ToggleThemeNavMenuEntry isDark={isDark} iconClassName={"w-4 h-4"} isMotion={true} />
            )}
        </ul>
    );
}

export const MobileNavButton = ({ onClick, isOpen }: { isOpen: boolean, onClick?: () => void}) => {
    return (
        <button
            onClick={onClick}
            aria-label="Toggle navigation menu"
            className="p-2 bg-gradient-to-r from-white/60 via-neutral-200/70 to-white/60  dark:from-black/80 dark:via-neutral-900/70 dark:to-black/80
                            shadow-xl dark:shadow-lg shadow-neutral-700/10 dark:shadow-neutral-300/10 border border-neutral-500/30 dark:border-neutral-300/20 rounded-full"
        >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
    );
}

export const MobileNavbarItem = ({ entry, iconClassName }: { entry: NavbarEntry, iconClassName: string }) => {
    return (
        <li>
            <a
                href={entry.href}
                className="block px-4 py-2"
                download={entry.download ?? undefined}
            >
                <entry.Icon className={iconClassName} />
                <span className="sr-only">{entry.label}</span>
            </a>
        </li>
    );
}

export const MobileNavbarItems = ({ items, mounted, isDark }: { items: NavbarEntry[], mounted: boolean, isDark: boolean }) => {
    return (
        <ul className="flex flex-col">
            {items.map((entry, index) => (
                <MobileNavbarItem key={index} entry={entry} iconClassName={"w-4 h-4"} />
            ))}

            {mounted && (
                <ToggleThemeNavMenuEntry isDark={isDark} isMotion={false} iconClassName={"w-4 h-4"} />
            )}
        </ul>
    );
}

export const MobileNavbarContainer = ({ scrolled=true, showNav=true, children } : { scrolled?: boolean, showNav?: boolean, children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{
                x: scrolled ? (showNav ? 0 : 55) : 0,
                opacity: scrolled  ? (showNav ? 1 : 0.1) : 1,
            }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className="fixed md:hidden z-50 top-5 right-3 flex flex-col items-center gap-2
                       pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]
                       pl-[env(safe-area-inset-left)] pb-[env(safe-area-inset-bottom)]"
        >
            {children}
        </motion.div>
    );
}

export const MobileNavbarLayout = ({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <motion.nav
            initial={{ height: 500, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="py-1 flex items-center justify-center
                            bg-gradient-to-r from-white/60 via-neutral-200/70 to-white/60  dark:from-black/80 dark:via-neutral-900/70 dark:to-black/80
                            shadow-xl dark:shadow-lg shadow-neutral-700/10 dark:shadow-neutral-300/10 border border-neutral-500/30 dark:border-neutral-300/20 rounded-xl"
        >
            {children}
        </motion.nav>
    );
}

export const MobileNavbarContents = ({ items, isOpen, mounted, isDark }: { items: NavbarEntry[], mounted: boolean, isOpen: boolean, isDark: boolean }) => {
    return (
        <MobileNavbarLayout isOpen={isOpen}>
            <MobileNavbarItems items={items} mounted={mounted} isDark={isDark} />
        </MobileNavbarLayout>
    );
}