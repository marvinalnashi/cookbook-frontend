import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./theme-context";
import React from "react";

export const metadata: Metadata = {
    title: "Little Chef's Cookbook",
    description: "Cookbook for kids and grown-up wizards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <ThemeProvider>
            <div className="max-w-md w-full mx-auto px-4 py-6">{children}</div>
        </ThemeProvider>
        </body>
        </html>
    );
}
