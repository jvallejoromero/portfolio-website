import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import URLCleaner from "@/components/URLCleaner";
import Navbar from "@/components/Navbar";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>Jonathan&#39;s Portfolio</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
        </head>
        <body>
        <URLCleaner />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Navbar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
