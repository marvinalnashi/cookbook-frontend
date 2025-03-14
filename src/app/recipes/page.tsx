"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://little-chefs-cookbook-production.up.railway.app";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/recipes`)
            .then((response) => setRecipes(response.data))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe: any) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
