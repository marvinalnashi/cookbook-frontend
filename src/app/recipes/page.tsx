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

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log("Fetching recipes 1 from:", API_URL);
                console.log("Fetching recipes 2 from:", `${API_URL}/recipes`);
                const response = await axios.get<Recipe[]>(`${API_URL}/recipes`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    setRecipes(response.data);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("Could not load recipes.");
            }
        };

        fetchRecipes();
    }, []);

    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (recipes.length === 0) return <p className="p-6">Loading recipes...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="p-4 border rounded-md cursor-pointer hover:shadow-md"
                        onClick={() => router.push(`/recipes/${recipe.id}`)}
                    >
                        <h2 className="text-lg font-semibold">{recipe.title}</h2>
                        <p className="text-gray-600">{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
