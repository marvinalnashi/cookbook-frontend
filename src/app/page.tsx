"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LEDStatus from "@/components/led-status";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

export default function Home() {
    const router = useRouter();
    const [pong, setPong] = useState("");

    useEffect(() => {
        axios
            .get(`${API_URL}/ping`)
            .then((res) => setPong(res.data.message))
            .catch((err) => console.error("Backend ping failed", err));
    }, []);

    return (
        <main className="flex flex-col items-center justify-start w-full h-screen bg-[#FCFAF8] px-4 py-6 overflow-y-auto">
            <div className="w-32 h-32 border border-black rounded-md mb-4 bg-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-600">Image</span>
            </div>

            <div className="bg-[#FDBA74] text-center text-black font-bold text-lg px-6 py-3 rounded-full shadow mb-6">
                WHAT DO YOU WANNA DO?
            </div>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#8ECAE6] text-black text-lg font-bold mb-4 transition-all hover:bg-[#219EBC]"
                onClick={() => router.push("/help-me-decide")}
            >
                <span className="text-2xl">⭐</span>
                <span className="flex-1 text-center">Help me to decide</span>
                <span className="text-sm">🔍</span>
            </button>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#8ECAE6] text-black text-lg font-bold mb-4 transition-all hover:bg-[#126782]"
                onClick={() => router.push("/recipes")}
            >
                <span className="text-2xl">📋</span>
                <span className="flex-1 text-center">All Recipes</span>
                <span className="text-sm">🔍</span>
            </button>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#8ECAE6] text-black text-lg font-bold mb-6 transition-all hover:bg-[#219EBC]"
                onClick={() => router.push("/options")}
            >
                <span className="text-2xl">🎚️</span>
                <span className="flex-1 text-center">Options</span>
                <span className="text-sm">🔍</span>
            </button>

            <div className="text-sm text-center mb-2">
                <p>Backend Response: {pong}</p>
            </div>

            <LEDStatus />
        </main>
    );
}
