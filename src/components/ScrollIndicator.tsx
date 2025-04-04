"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const win = window.innerHeight + window.scrollY;
            const doc = document.body.offsetHeight;
            setAtBottom((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 5));
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (atBottom) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-2xl">
            🔽
        </div>
    );
}
