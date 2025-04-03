"use client";

import React, { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-start h-screen overflow-y-auto px-6 py-4 bg-background text-text dark:bg-black dark:text-white transition-colors">
            {children}
        </div>
    );
}
