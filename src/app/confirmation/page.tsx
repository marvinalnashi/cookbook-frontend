"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
}

export default function ConfirmationPage() {
    const router = useRouter();
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
    const [filteredRecipes] = useState<Recipe[]>([]);
    const [matchMode, setMatchMode] = useState<"partial" | "strict">("partial");

    useEffect(() => {
        setSelectedOccasion(localStorage.getItem("selectedOccasion") || "");
        setIncludedIngredients(JSON.parse(localStorage.getItem("includedIngredients") || "[]"));
        setExcludedIngredients(JSON.parse(localStorage.getItem("excludedIngredients") || "[]"));
    }, []);

    const fetchFilteredRecipes = async () => {
        try {
            const payload = {
                occasion: selectedOccasion || "",
                include: includedIngredients || [],
                exclude: excludedIngredients || [],
                match_all: matchMode === "strict"
            };

            const response = await axios.post<Recipe[]>(`${API_URL}/recipes/filter`, payload, {
                headers: { "Content-Type": "application/json" }
            });

            localStorage.setItem("filteredRecipes", JSON.stringify(response.data));
            router.push("/recipes/filtered");
        } catch (error) {
            console.error("Error fetching filtered recipes:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="w-32 h-32 rounded-md mb-4 flex items-center justify-center">
                <img
                    src={"/ratwizard1.png"}
                    alt="Rat Wizard"
                    className="w-full h-auto"
                />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Selection</h1>
            <ul className="mb-4">
                <li><strong>Occasion:</strong> {selectedOccasion}</li>
                <li><strong>Included
                    Ingredients:</strong> {includedIngredients.length > 0 ? includedIngredients.join(", ") : "None"}
                </li>
                <li><strong>Excluded
                    Ingredients:</strong> {excludedIngredients.length > 0 ? excludedIngredients.join(", ") : "None"}
                </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                <button
                    onClick={() => router.push("/help-me-decide")}
                    className="bg-[#1E88E5] hover:bg-[#1565C0] text-white py-3 px-4 rounded-md w-full"
                >
                    Back
                </button>
                <div className="flex gap-2 w-full">
                    <button
                        className={`flex-1 py-2 rounded ${
                            matchMode === "partial"
                                ? "bg-[#1E88E5] text-white"
                                : "bg-gray-200 text-gray-900 dark:text-white"
                        }`}
                        onClick={() => setMatchMode("partial")}
                    >
                        Match any ingredient
                    </button>
                    <button
                        className={`flex-1 py-2 rounded ${
                            matchMode === "strict"
                                ? "bg-[#1E88E5] text-white"
                                : "bg-gray-200 text-gray-900 dark:text-white"
                        }`}
                        onClick={() => setMatchMode("strict")}
                    >
                        Match all ingredients
                    </button>
                </div>
                <button
                    onClick={fetchFilteredRecipes}
                    className="bg-[#1E88E5] hover:bg-[#1565C0] text-white py-3 px-4 rounded-md w-full"
                >
                    Recipes
                </button>
            </div>

            {filteredRecipes.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Filtered Recipes</h2>
                    <ul className="space-y-4">
                        {filteredRecipes.map((recipe) => (
                            <li key={recipe.id} className="p-4 bg-white rounded-md border border-gray-300 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{recipe.title}</h2>
                                <p className="text-gray-900 dark:text-white">{recipe.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
