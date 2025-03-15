"use client";

import { useRouter, useParams } from "next/navigation";

export default function CookingModePage() {
    const router = useRouter();
    const { id } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">How do you want to cook?</h1>
            <div className="flex flex-col gap-4">
                <button
                    className="bg-green-500 text-white p-4 rounded-md"
                    onClick={() => router.push(`/recipes/${id}/free-cooking`)}
                >
                    Free Cooking
                </button>
                <button
                    className="bg-green-700 text-white p-4 rounded-md"
                    onClick={() => router.push(`/recipes/${id}/guided-cooking`)}
                >
                    Guided Cooking
                </button>
            </div>
        </div>
    );
}
