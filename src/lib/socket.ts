import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws" || "wss://little-chefs-cookbook-production.up.railway.app/ws";

export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
});
