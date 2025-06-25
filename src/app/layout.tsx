import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import URLCleaner from "@/components/URLCleaner";
import Navbar from "@/components/Navbar";
import {env} from "@/lib/env";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>Jonathan Vallejo — Full-Stack Web & Software Developer</title>

            <link rel="canonical" href={env.SITE_URL} />
            <link rel="sitemap" type="application/xml" href={`${env.SITE_URL}/sitemap.xml`} />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="icon" type="image/png" sizes="32x32" href="/logo-32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

            <meta name="description" content="Jonathan Vallejo is a full-stack web developer specializing in React, Next.js, and scalable applications. Explore projects, blog posts, and get in touch." />
            <meta property="og:title" content="Jonathan Vallejo — Full-Stack Web & Software Developer" />
            <meta property="og:description" content="Jonathan Vallejo is a full-stack web developer specializing in React, Next.js, and scalable applications. Explore projects and get in touch." />
            <meta property="og:url" content={env.SITE_URL} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`${env.SITE_URL}/og-image.png`} />
            <meta name="twitter:image" content={`${env.SITE_URL}/og-image.png`} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "Jonathan Vallejo",
                        url: env.SITE_URL,
                        sameAs: [
                            "https://github.com/jvallejoromero",
                            "https://www.linkedin.com/in/jonathan-vallejo/",
                        ],
                        jobTitle: "Full-Stack Developer",
                    }),
                }}
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
