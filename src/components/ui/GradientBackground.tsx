import React from "react";
import {cn} from "@/lib/utils";

const GradientBackground = ({ children, className="" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`relative flex h-[100dvh] w-full items-center justify-center bg-white dark:bg-black ${className}`}>
            {/* Radial gradients for the container to give a faded look */}
            <div
                className={cn(
                    "z-0",
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent dark:from-black"/>
            <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent dark:from-black"/>

            {children}
        </div>
    );
}

export default GradientBackground;