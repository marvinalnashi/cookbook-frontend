import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
    occasion: string;
}

export default function Recipes() {
    const router = useRouter();
    const { occasion, preferences } = router.query;

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let response;
                if (occasion) {
                    response = await axios.post(`${API_URL}/recipes/filter`, {
                        occasion,
                        include: preferences ? (preferences as string).split(",") : [],
                        exclude: [],
                    });
                } else {
                    response = await axios.get(`${API_URL}/recipes/`);
                }
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [occasion, preferences]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="p-4 bg-gray-200 mb-2 rounded-md">
                            <h2 className="text-lg font-semibold">{recipe.title}</h2>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
