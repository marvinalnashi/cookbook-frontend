import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export function useKeyboardNavigation() {
    const [focusedIndex, setFocusedIndex] = useState(0);
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

        const goBack = () => window.history.back();
        const selectHovered = () => focusables[focusedIndex]?.click();
        const goHome = () => router.push("/");
        const moveUp = () => setFocusedIndex((prev) => Math.max(prev - 1, 0));
        const moveDown = () => setFocusedIndex((prev) => Math.min(prev + 1, focusables.length - 1));

        const handleNavigationCommand = (command: string) => {
            switch (command) {
                case "up":
                    moveUp();
                    break;
                case "down":
                    moveDown();
                    break;
                case "left":
                    goBack();
                    break;
                case "right":
                    selectHovered();
                    break;
                case "home":
                    goHome();
                    break;
                default:
                    console.warn("Unknown MQTT command:", command);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!focusables.length) return;

            switch (e.key) {
                case "ArrowDown":
                    moveDown();
                    break;
                case "ArrowUp":
                    moveUp();
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    goBack();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    selectHovered();
                    break;
                case " ":
                    e.preventDefault();
                    goHome();
                    break;
            }
        };

        const handleMQTTMessage = (event: MessageEvent) => {
            try {
                const message = JSON.parse(event.data);
                if (message.topic?.startsWith("nav/")) {
                    const command = message.topic.split("/")[1];
                    handleNavigationCommand(command);
                }
            } catch (error) {
                console.error("MQTT message parsing failed:", error);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        socket?.addEventListener("message", handleMQTTMessage);
        highlightElement();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            socket?.removeEventListener("message", handleMQTTMessage);
        };
    }, [focusedIndex, router]);
}
