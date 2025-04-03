import type { Metadata } from "next";
import "./globals.css";
import ThemeWrapper from "./theme-wrapper";

export const metadata: Metadata = {
    title: "Little Chef's Cookbook",
    description: "Cookbook for kids and grown-up wizards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeWrapper>{children}</ThemeWrapper>
        </body>
        </html>
    );
}
