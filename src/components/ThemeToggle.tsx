"use client";

import { useTheme } from "next-themes";
import React, { useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [ripple, setRipple] = useState<{ x: number, y: number, next: "light" | "dark" } | null>(null);

    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            // center of the button
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            setRipple({ x, y, next: isDark ? "light" : "dark" });
        }, [isDark]);

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
                className="rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {ripple && (
                <motion.div
                    key="ripple"
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
                />
            )}
        </>
    );
}
