import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import URLCleaner from "@/components/utils/URLCleaner";
import Navbar from "@/components/navigation/Navbar";
import {env} from "@/lib/env";
import Script from "next/dist/client/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* Google Tag Manager */}
            <Script id="gtm-loader" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],j=d.createElement(s), dl = l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');
                 `}
            </Script>

            <title>Jonathan Vallejo — Full-Stack Web & Software Developer</title>

            <link rel="canonical" href={env.SITE_URL} />
            <link rel="sitemap" type="application/xml" href={`${env.SITE_URL}/sitemap.xml`} />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="icon" type="image/png" sizes="32x32" href="/logo-32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

            <meta name="description" content="I'm Jonathan, a full-stack developer specializing in React, Next.js, and scalable applications. Explore projects, blog posts, and get in touch." />
            <meta property="og:title" content="Jonathan Vallejo — Portfolio" />
            <meta property="og:description" content="Check out Jonathan's portfolio" />
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
        {/* Google Tag Manager fallback */}
        <noscript
            dangerouslySetInnerHTML={{
                __html: `
              <iframe 
                src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden">
              </iframe>
            `,
            }}
        />

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
