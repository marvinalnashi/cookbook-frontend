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
        axios.get(`${API_URL}/ping`)
            .then((res) => setPong(res.data.message))
            .catch((err) => console.error("Backend ping failed", err));
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-md">
            <h1 className="text-4xl font-bold mb-8 text-center">Little Chefs</h1>

            <button className="primary mb-4" onClick={() => router.push("/help-me-decide")}>Help me decide</button>
            <button className="secondary mb-4" onClick={() => router.push("/recipes")}>View Recipes</button>
            <button className="danger mb-4" onClick={() => router.push("/options")}>Settings</button>

            <div className="text-center text-sm mt-6">
                <p>Backend Response: {pong}</p>
            </div>

            <LEDStatus />
        </div>
    );
}
