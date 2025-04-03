"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";
const WS_URL = API_URL.replace("https://", "wss://").replace("http://", "ws://") + "/ws";

interface LEDState {
    power: string;
    color: string;
}

export default function LEDStatus() {
    const [ledState, setLedState] = useState<LEDState>({ power: "off", color: "000000" });

    useEffect(() => {
        axios.get(`${API_URL}/led/status`)
            .then(response => setLedState(response.data))
            .catch(error => console.error("Error fetching LED state:", error));

        const socket = new WebSocket(WS_URL);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLedState(data);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl !dark:text-white font-semibold">LED Status</h2>
            <p><strong>LEDs On:</strong> {ledState.power === "on" ? "Yes" : "No"}</p>
            <p><strong>Current Color:</strong> {ledState.power === "on" ? `#${ledState.color}` : "N/A"}</p>
        </div>
    );
}
