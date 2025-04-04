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
        <html lang="en">
        <body className="bg-white dark:bg-gray-900 text-neutral-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
            <main className="relative w-full max-w-md mx-auto min-h-screen overflow-x-hidden overflow-y-auto px-4 py-6">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
