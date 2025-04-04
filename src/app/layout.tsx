import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Little Chef's Cookbook",
    description: "Cookbook for kids and grown-up wizards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="flex flex-col items-center justify-start h-screen overflow-y-auto px-6 py-4">
        {children}
        </body>
        </html>
    );
}