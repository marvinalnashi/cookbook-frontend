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
                exclude: excludedIngredients || []
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
            <h1 className="text-2xl font-bold mb-4">Your Selection</h1>
            <ul className="mb-4">
                <li><strong>Occasion:</strong> {selectedOccasion}</li>
                <li><strong>Included Ingredients:</strong> {includedIngredients.length > 0 ? includedIngredients.join(", ") : "None"}</li>
                <li><strong>Excluded Ingredients:</strong> {excludedIngredients.length > 0 ? excludedIngredients.join(", ") : "None"}</li>
            </ul>

            <div className="mt-6 flex justify-between">
                <button onClick={() => router.push("/help-me-decide")} className="bg-orange-500 text-white p-4 rounded-md">
                    Go back
                </button>
                <button onClick={fetchFilteredRecipes} className="bg-green-500 text-white p-4 rounded-md">
                    See recipes
                </button>
            </div>

            {filteredRecipes.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Filtered Recipes</h2>
                    <ul className="space-y-4">
                        {filteredRecipes.map((recipe) => (
                            <li key={recipe.id} className="p-4 bg-white rounded-md border border-gray-300 shadow-sm">
                                <h2 className="text-lg font-semibold text-black">{recipe.title}</h2>
                                <p className="text-black">{recipe.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
