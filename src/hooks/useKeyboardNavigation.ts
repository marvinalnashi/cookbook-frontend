import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { navSocket } from "@/lib/socket";

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

        const goBack = () => {
            window.history.back();
        };

        const selectHovered = () => {
            focusables[focusedIndex]?.click();
        };

        const goHome = () => {
            router.push("/");
        };

        const moveUp = () => {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
        };

        const moveDown = () => {
            setFocusedIndex((prev) => Math.min(prev + 1, focusables.length - 1));
        };

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
            const topic = event.data?.toString().trim();
            if (topic?.startsWith("nav/")) {
                const command = topic.replace("nav/", "");
                handleNavigationCommand(command);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        if (navSocket) {
            navSocket.addEventListener("message", handleMQTTMessage);
        }

        highlightElement();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (navSocket) {
                navSocket.removeEventListener("message", handleMQTTMessage);
            }
        };
    }, [focusedIndex, router]);
}