"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LEDStatus from "@/components/led-status";
import {speakVisibleText} from "@/utils/narrator";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

export default function Home() {
    const router = useRouter();
    const [pong, setPong] = useState("");

    useEffect(() => {
        axios
            .get(`${API_URL}/ping`)
            .then((res) => setPong(res.data.message))
            .catch((err) => console.error("Backend ping failed", err));
        speakVisibleText();
    }, []);

    const playSound = () => {
        const audio = new Audio("/effect1.ogg");
        const volume = parseFloat(localStorage.getItem("sfxVolume") || "0.7");
        audio.volume = volume;
        audio.play().catch(() => {});
    };

    const handleClick = (path: string) => {
        playSound();
        setTimeout(() => router.push(path), 150);
    };

    return (
        <main className="flex flex-col items-center justify-start w-full h-screen px-4 py-6 overflow-y-auto">
            <div className="w-32 h-32 rounded-md mb-4 flex items-center justify-center">
                <img
                    src={"/ratwizard4.png"}
                    alt="Rat Wizard"
                    className="w-full h-auto"
                />
            </div>

            <div className="bg-[#FDBA74] text-center text-white font-bold text-lg px-6 py-3 rounded-full shadow mb-6">
                What would you like to do?
            </div>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl text-white bg-[#1E88E5] text-lg font-bold mb-4 transition-all hover:bg-[#1565C0]"
                onClick={() => handleClick("/help-me-decide")}
            >
                <span className="text-2xl">⭐</span>
                <span className="flex-1 text-center">Help me to decide</span>
                <span className="text-sm">🔍</span>
            </button>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl text-white bg-[#1E88E5] text-lg font-bold mb-4 transition-all hover:bg-[#1565C0]"
                onClick={() => handleClick("/recipes")}
            >
                <span className="text-2xl">📋</span>
                <span className="flex-1 text-center">All recipes</span>
                <span className="text-sm">🔍</span>
            </button>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl text-white bg-[#1E88E5] text-lg font-bold mb-6 transition-all hover:bg-[#1565C0]"
                onClick={() => handleClick("/options")}
            >
                <span className="text-2xl">⚙️</span>
                <span className="flex-1 text-center">Options</span>
                <span className="text-sm">🔍</span>
            </button>

            <div className="text-sm text-center mb-2">
                <p>Backend response: {pong}</p>
            </div>

            <LEDStatus />
        </main>
    );
}