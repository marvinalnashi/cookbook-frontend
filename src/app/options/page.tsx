"use client";
import { useTheme } from "@/context/ThemeContext";

export default function Page() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Options</h1>
            <p className="mb-4">Toggle the site theme:</p>
            <button
                onClick={toggleTheme}
                className="bg-[#1E88E5] text-white font-bold py-2 px-4 rounded"
            >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </div>
    );
}
