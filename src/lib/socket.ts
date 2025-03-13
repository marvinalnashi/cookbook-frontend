import { io } from "socket.io-client";

const SOCKET_URL = "wss://little-chefs-cookbook-production.up.railway.app/ws";

export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
});
