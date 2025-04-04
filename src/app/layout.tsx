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
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
