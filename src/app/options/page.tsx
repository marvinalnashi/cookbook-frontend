"use client";

import { useTheme } from "../theme-context";
import { useRouter } from "next/navigation";

export default function OptionsPage() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Options</h1>

            <button
                onClick={() => router.push("/")}
                className="flex items-center justify-center w-60 px-4 py-4 rounded-2xl bg-[#FCA5A5] text-black dark:text-white text-lg font-bold mb-4 hover:bg-[#EF4444]"
            >
                🏠 Home
            </button>

            <button
                onClick={toggleTheme}
                className={`flex items-center justify-center w-60 px-4 py-4 rounded-2xl text-lg font-bold mb-4 ${
                    theme === "dark"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
                }`}
            >
                {theme === "dark" ? "🌙 Dark Mode - ON" : "🌙 Dark Mode - OFF"}
            </button>
        </div>
    );
}
