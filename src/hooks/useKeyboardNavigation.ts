import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

const uuid = "unique-test-id";

export function useKeyboardNavigation() {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const focusables = Array.from(document.querySelectorAll("button"));

        const highlight = () => {
            focusables.forEach((el, i) => {
                el.classList.toggle("ring-4", i === focusedIndex);
                el.classList.toggle("ring-green-400", i === focusedIndex);
                el.classList.toggle("ring-offset-2", i === focusedIndex);
            });
        };

        const handleEvent = (event: string) => {
            switch (event) {
                case "up": setFocusedIndex(prev => Math.max(prev - 1, 0)); break;
                case "down": setFocusedIndex(prev => Math.min(prev + 1, focusables.length - 1)); break;
                case "left": router.back(); break;
                case "right": focusables[focusedIndex]?.click(); break;
                case "home": router.push("/"); break;
            }
        };

        const handleSocketMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (data.uuid === uuid) {
                    handleEvent(data.event);
                }
            } catch (err) {
                console.error("Invalid WebSocket message:", err);
            }
        };

        highlight();

        if (socket) {
            socket.addEventListener("message", handleSocketMessage);
        }

        return () => {
            if (socket) {
                socket.removeEventListener("message", handleSocketMessage);
            }
        };
    }, [focusedIndex, router]);
}
