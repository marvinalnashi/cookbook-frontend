import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
    title: "Little Chef's Cookbook",
    description: "Cookbook for kids and grown-up wizards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="flex flex-col items-center justify-start h-screen overflow-y-auto px-6 py-4">
        <ThemeProvider>
            <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}
