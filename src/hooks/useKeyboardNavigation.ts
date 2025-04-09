import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

const uuid = "rpi";

export function useKeyboardNavigation() {
    const [focusedIndex, setFocusedIndexState] = useState(0);
    const focusedIndexRef = useRef(0);
    const router = useRouter();

    const setFocusedIndex = (val: number) => {
        focusedIndexRef.current = val;
        setFocusedIndexState(val);
    };

    useEffect(() => {
        const focusables = Array.from(document.querySelectorAll("button"));

        const highlight = () => {
            focusables.forEach((el, i) => {
                el.classList.toggle("ring-4", i === focusedIndexRef.current);
                el.classList.toggle("ring-green-400", i === focusedIndexRef.current);
                el.classList.toggle("ring-offset-2", i === focusedIndexRef.current);
            });
        };

        const handleEvent = (event: string) => {
            switch (event) {
                case "up": setFocusedIndex(Math.max(focusedIndexRef.current - 1, 0)); break;
                case "down": setFocusedIndex(Math.min(focusedIndexRef.current + 1, focusables.length - 1)); break;
                case "left": router.back(); break;
                case "right": focusables[focusedIndexRef.current]?.click(); break;
                case "home": router.push("/"); break;
            }
        };

        const handleSocketMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (data.uuid === uuid) {
                    handleEvent(data.event);
                    highlight();
                }
            } catch (err) {
                console.error("Invalid WebSocket message:", err);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown": handleEvent("down"); break;
                case "ArrowUp": handleEvent("up"); break;
                case "ArrowLeft": e.preventDefault(); handleEvent("left"); break;
                case "ArrowRight": e.preventDefault(); handleEvent("right"); break;
                case " ": e.preventDefault(); handleEvent("home"); break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        socket?.addEventListener("message", handleSocketMessage);

        highlight();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            socket?.removeEventListener("message", handleSocketMessage);
        };
    }, [router]);
}
