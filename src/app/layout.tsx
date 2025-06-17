import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <title>My Portfolio</title>
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
      </head>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
