import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!focusables.length) return;

            switch (e.key) {
                case "ArrowDown":
                    setFocusedIndex(prev => Math.min(prev + 1, focusables.length - 1));
                    break;
                case "ArrowUp":
                    setFocusedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    window.history.back();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    focusables[focusedIndex]?.click();
                    break;
                case " ":
                    e.preventDefault();
                    router.push("/");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        highlightElement();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusedIndex, router]);
}
