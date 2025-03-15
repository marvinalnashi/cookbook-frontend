"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
    occasion: string;
    ingredients: string[];
    steps: string[];
}

export default function RecipeDetailPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/recipes/${id}`)
            .then((response) => setRecipe(response.data))
            .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    if (!recipe) return <p className="p-6">Loading recipe...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-gray-700 mb-4">{recipe.description}</p>
            <p className="text-gray-600"><strong>Occasion:</strong> {recipe.occasion}</p>

            <h2 className="text-lg font-semibold mt-4">Ingredients</h2>
            <ul className="list-disc ml-6 text-gray-800">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h2 className="text-lg font-semibold mt-4">Preparation Steps</h2>
            <ol className="list-decimal ml-6 text-gray-800">
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>

            <div className="mt-6 flex gap-4">
                <button onClick={() => router.back()} className="bg-gray-500 text-white p-4 rounded-md">
                    Back
                </button>
                <button onClick={() => router.push(`/recipes/${id}/cook`)} className="bg-green-500 text-white p-4 rounded-md">
                    Cook
                </button>
            </div>
        </div>
    );
}
