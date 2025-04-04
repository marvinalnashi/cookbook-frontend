"use client";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Options</h1>
            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#FCA5A5] text-lg font-bold mb-4 transition-all hover:bg-[#EF4444]"
                onClick={() => {
                    router.push("/");
                }}
            >
                <span className="text-2xl">🏠</span>
                <span className="flex-1 text-center">Home</span>
                <span className="text-sm">🔍</span>
            </button>
            <p className="mb-4">Toggle the site theme:</p>
            <button
                onClick={toggleTheme}
                className="bg-[#1E88E5] hover:bg-[#1565C0] text-white flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl text-lg font-bold mb-4 transition-all"
            >
                <span className="text-2xl">{theme === "light" ? "🌕" : "☀️"}</span>
                <span className="flex-1 text-center">{theme === "light" ? "Dark" : "Light"} Mode</span>
                <span className="text-sm">🔍</span>
            </button>
            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#FCA5A5] text-lg font-bold mb-4 transition-all hover:bg-[#EF4444]"
                onClick={() => {
                    localStorage.removeItem("includedIngredients");
                    localStorage.removeItem("excludedIngredients");
                    localStorage.removeItem("selectedOccasion");
                }}
            >
                <span className="text-2xl">💾</span>
                <span className="flex-1 text-center">Clear Localstorage</span>
                <span className="text-sm">🔍</span>
            </button>
        </div>
    );
}
