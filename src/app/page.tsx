"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

export default function Home() {
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/ping`);
                setResponse(res.data.message);
            } catch (error) {
                console.error("API Fetch Error:", error);
                setResponse("Failed to connect to backend");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">What do you want to do?</h1>
            <Link href="/help-me-decide" className="px-6 py-3 bg-green-500 text-white rounded-md m-2">Help Me Decide</Link>
            <Link href="/recipes" className="px-6 py-3 bg-blue-500 text-white rounded-md m-2">All Recipes</Link>
            <Link href="/options" className="px-6 py-3 bg-gray-500 text-white rounded-md m-2">Options</Link>
            <p className="text-sm mt-4">Backend Response: {response}</p>
        </div>
    );
}
