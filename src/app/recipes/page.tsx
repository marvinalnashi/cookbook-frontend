"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
    occasion: string;
    ingredients: string[];
    steps: string[];
}

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios.get(`${API_URL}/recipes`)
            .then((response) => setRecipes(response.data))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <ul className="space-y-4">
                {recipes.length === 0 ? (
                    <p>No recipes available.</p>
                ) : (
                    recipes.map((recipe) => (
                        <li key={recipe.id}
                            className="p-4 bg-white rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => router.push(`/recipes/${recipe.id}`)}>
                            <h2 className="text-lg font-semibold text-black">{recipe.title}</h2>
                            <p className="text-gray-700">{recipe.description}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
