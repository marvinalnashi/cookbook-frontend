"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function FreeCookingPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { id } = useParams();
    const router = useRouter();

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

            <button onClick={() => router.back()} className="mt-6 bg-gray-500 text-white p-4 rounded-md">
                Back
            </button>
        </div>
    );
}
