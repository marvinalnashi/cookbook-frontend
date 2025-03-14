"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <h1>What do you want to do?</h1>
            <button onClick={() => router.push("/help-me-decide")}>Help me decide</button>
            <button onClick={() => router.push("/recipes")}>All Recipes</button>
            <button onClick={() => router.push("/options")}>Options</button>
        </div>
    );
}
