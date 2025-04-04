"use client";

import { useTheme } from "./theme-context";
import React from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <div
            className={`flex flex-col items-center justify-start h-screen overflow-y-auto px-6 py-4 transition-colors ${
                theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            {children}
        </div>
    );
}
