"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching from:", `${API_URL}/ping`);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
        <h1 className="text-3xl font-bold">Cookbook Frontend</h1>
        <p className="mt-4 text-xl">{response ? `Backend Response: ${response}` : "Connecting..."}</p>
      </div>
  );
}
