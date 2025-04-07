import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";

export function useKeyboardNavigation() {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [clientId] = useState(() => {
        const storedId = localStorage.getItem("clientId");
        if (storedId) return storedId;
        const newId = uuidv4();
        localStorage.setItem("clientId", newId);
        return newId;
    });

    const router = useRouter();

    useEffect(() => {
        const focusables = Array.from(document.querySelectorAll("button"));

        const highlightElement = () => {
            focusables.forEach((el, index) => {
                el.classList.toggle("ring-4", index === focusedIndex);
                el.classList.toggle("ring-green-400", index === focusedIndex);
                el.classList.toggle("ring-offset-2", index === focusedIndex);
            });
        };

        const handleEvent = (event: string) => {
            if (!focusables.length) return;
            switch (event) {
                case "up":
                    setFocusedIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case "down":
                    setFocusedIndex((prev) => Math.min(prev + 1, focusables.length - 1));
                    break;
                case "left":
                    router.back();
                    break;
                case "right":
                    focusables[focusedIndex]?.click();
                    break;
                case "home":
                    router.push("/");
                    break;
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    handleEvent("up");
                    break;
                case "ArrowDown":
                    handleEvent("down");
                    break;
                case "ArrowLeft":
                    handleEvent("left");
                    break;
                case "ArrowRight":
                    handleEvent("right");
                    break;
                case " ":
                    e.preventDefault();
                    handleEvent("home");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        socket.on("connect", () => {
            console.log("WebSocket connected");
            socket.emit("register-client", clientId);
        });

        socket.on("nav", (data: { event: string; targetId: string }) => {
            if (data.targetId === clientId) {
                handleEvent(data.event);
            }
        });

        highlightElement();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            socket.off("nav");
        };
    }, [focusedIndex, router]);
}
