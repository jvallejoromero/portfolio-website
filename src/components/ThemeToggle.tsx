"use client";

import { useTheme } from "next-themes";
import React, { useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import {createPortal} from "react-dom";

type RippleData = { x: number; y: number; next: "light" | "dark"; key: string };

type ThemeToggleProps = {
    iconClassName: string,
}

export const ThemeToggle = ({ iconClassName }: ThemeToggleProps) => {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [ripple, setRipple] = useState<RippleData | null>(null);

    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            if (ripple) {
                return;
            }

            const rect = (e.target as HTMLElement).getBoundingClientRect();
            // center of the button
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const next = isDark ? "light" : "dark";
            const key = `${next}-${Date.now()}`;
            setRipple({ x, y, next, key });
        }, [isDark, ripple]);

    // Calculate max radius to cover the viewport
    const maxRadius = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // farthest corner from (x,y)
        const dx = Math.max(ripple!.x, w - ripple!.x);
        const dy = Math.max(ripple!.y, h - ripple!.y);
        return Math.hypot(dx, dy);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={onClick}
                className="hover:text-muted-foreground text-sm transition-colors cursor-pointer p-2 -m-2 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun className={iconClassName} /> : <Moon className={iconClassName} />}
            </button>

            {ripple && (
                createPortal(<motion.div
                    key={ripple.key}
                    initial={{
                        clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
                        backgroundColor: isDark ? "#fff" : "#000",
                    }}
                    animate={{
                        clipPath: `circle(${maxRadius()}px at ${ripple.x}px ${ripple.y}px)`,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                    onAnimationComplete={() => {
                        setTheme(ripple.next);
                        setRipple(null);
                    }}
                />, document.body)
            )}
        </>
    );
}

export default ThemeToggle;
