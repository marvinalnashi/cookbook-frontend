"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="text-center p-6">
            <h1 className="text-3xl font-bold mb-4">What do you want to do?</h1>
            <div className="flex flex-col gap-4">
                <button className="primary" onClick={() => router.push("/help-me-decide")}>Help me decide</button>
                <button className="secondary" onClick={() => router.push("/recipes")}>All Recipes</button>
                <button className="danger" onClick={() => router.push("/options")}>Options</button>
            </div>
        </div>
    );
}
