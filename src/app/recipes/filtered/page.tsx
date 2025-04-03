"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Recipe {
    id: number;
    title: string;
    description: string;
}

export default function FilteredRecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("filteredRecipes");
        if (stored) {
            setRecipes(JSON.parse(stored));
        }
    }, []);

    if (recipes.length === 0) return <p className="p-6">No filtered recipes found.</p>;

    return (
        <main
            className="flex flex-col items-center justify-start w-full h-screen bg-[#FCFAF8] px-4 py-6 overflow-y-auto">
            <div className="w-32 h-32 rounded-md mb-4 flex items-center justify-center">
                <img
                    src={"/ratwizard4.png"}
                    alt="Rat Wizard"
                    className="w-full h-auto"
                />
            </div>

            <div className="bg-[#FDBA74] text-center text-black font-bold text-lg px-6 py-3 rounded-full shadow mb-6">
                PICK YOUR NIBBLE:
            </div>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#FCA5A5] text-black text-lg font-bold mb-4 transition-all hover:bg-[#EF4444]"
                onClick={() => {
                    localStorage.removeItem("includedIngredients");
                    localStorage.removeItem("excludedIngredients");
                    localStorage.removeItem("selectedOccasion");
                    router.push("/");
                }}
            >
                <span className="text-2xl">🏠</span>
                <span className="flex-1 text-center">Home</span>
                <span className="text-sm">🔍</span>
            </button>

            {recipes.map((recipe) => (
                <button
                    key={recipe.id}
                    className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#B9FBC0] text-black text-lg font-bold mb-4 transition-all hover:bg-[#34D399]"
                    onClick={() => router.push(`/recipes/${recipe.id}/cook`)}
                >
                    <span className="text-2xl">🍽️</span>
                    <span className="flex-1 text-center">{recipe.title}</span>
                    <span className="text-sm">🔍</span>
                </button>
            ))}
        </main>
    );
}
