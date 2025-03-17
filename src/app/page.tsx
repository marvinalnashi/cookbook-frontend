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
            .then((response) => setPong(response.data.message))
            .catch((error) => console.error("Error fetching pong:", error));
    }, []);

    return (
        <div className="text-center p-6">
            <h1 className="text-3xl font-bold mb-4">What do you want to do?</h1>
            <div className="flex flex-col gap-4">
                <button className="primary" onClick={() => router.push("/help-me-decide")}>Help me decide</button>
                <button className="secondary" onClick={() => router.push("/recipes")}>All Recipes</button>
                <button className="danger" onClick={() => router.push("/options")}>Options</button>
            </div>
            <p className="mt-4 text-sm text-gray-500">Backend Response: {pong}</p>
            <LEDStatus />
        </div>
    );
}
