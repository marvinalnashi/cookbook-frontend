import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://little-chefs-cookbook-production.up.railway.app";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/recipes/`).then((response) => {
            setRecipes(response.data);
        });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="p-4 bg-gray-200 mb-2 rounded-md">
                        <h2 className="text-lg font-semibold">{recipe.name}</h2>
                        <p>{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
