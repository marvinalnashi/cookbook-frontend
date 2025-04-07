const WS_BASE = process.env.NEXT_PUBLIC_BACKEND_WS_URL || "wss://little-chefs-cookbook-production.up.railway.app/ws";

let socket: WebSocket | null = null;

if (typeof window !== "undefined") {
    try {
        socket = new WebSocket(WS_BASE);

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };
    } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
    }
}

export const navSocket = socket;