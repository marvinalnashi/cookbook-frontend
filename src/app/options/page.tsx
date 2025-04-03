"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OptionsPage() {
    const router = useRouter();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        setIsDark(theme === "dark");
    }, []);

    const toggleDarkMode = () => {
        const newMode = isDark ? "light" : "dark";
        localStorage.setItem("theme", newMode);
        setIsDark(!isDark);

        if (newMode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Options</h1>

            <button
                className="bg-[#FFB703] hover:bg-orange-500 text-black dark:text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push("/")}
            >
                🏠 Home
            </button>

            <button
                className={`w-full py-2 px-4 rounded text-lg font-bold ${
                    isDark ? "bg-green-600 text-white" : "bg-blue-600 text-white"
                }`}
                onClick={toggleDarkMode}
            >
                {isDark ? "🌙 Dark Mode - ON" : "🌙 Dark Mode - OFF"}
            </button>
        </div>
    );
}
