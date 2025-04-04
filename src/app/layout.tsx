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
        <body>
        <ThemeProvider>
            <main className="flex flex-col items-center justify-start w-full max-w-md mx-auto px-4 py-6 overflow-y-auto h-screen">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
