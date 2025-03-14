"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConfirmationPage() {
    const router = useRouter();

    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

    useEffect(() => {
        const occasion = localStorage.getItem("selectedOccasion");
        const included = JSON.parse(localStorage.getItem("includedIngredients") || "[]");
        const excluded = JSON.parse(localStorage.getItem("excludedIngredients") || "[]");

        setSelectedOccasion(occasion);
        setIncludedIngredients(included);
        setExcludedIngredients(excluded);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Selection</h1>
            <ul className="mb-4">
                <li><strong>Occasion:</strong> {selectedOccasion}</li>
                <li><strong>Included Ingredients:</strong> {includedIngredients.join(", ") || "None"}</li>
                <li><strong>Excluded Ingredients:</strong> {excludedIngredients.join(", ") || "None"}</li>
            </ul>

            <div className="flex justify-between">
                <button onClick={() => router.push("/help-me-decide")} className="bg-orange-500 text-white p-4 rounded-md">
                    Go Back to Selection
                </button>
                <button onClick={() => router.push("/recipes")} className="bg-green-500 text-white p-4 rounded-md">
                    Submit & Find Recipes
                </button>
            </div>
        </div>
    );
}
