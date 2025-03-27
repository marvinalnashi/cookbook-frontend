"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HelpMeDecide() {
    const router = useRouter();

    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    const [mode, setMode] = useState<"include" | "exclude" | null>(null);

    const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

    const ingredientOptions: { [key: string]: string[] } = {
        Dairy: ["Milk", "Cheese", "Butter", "Yoghurt"],
        Vegetables: ["Cucumber", "Tomato", "Potato", "Carrot", "Spinach"],
        Meat: ["Beef", "Pork", "Mutton"]
    };

    useEffect(() => {
        const savedOccasion = localStorage.getItem("selectedOccasion");
        const savedIncluded = JSON.parse(localStorage.getItem("includedIngredients") || "[]");
        const savedExcluded = JSON.parse(localStorage.getItem("excludedIngredients") || "[]");

        if (savedOccasion) setSelectedOccasion(savedOccasion);
        setIncludedIngredients(savedIncluded);
        setExcludedIngredients(savedExcluded);
    }, []);

    const handleOccasionSelect = (occasion: string) => {
        setSelectedOccasion(occasion);
        localStorage.setItem("selectedOccasion", occasion);
    };

    const handleCategorySelect = (category: string) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
        setCurrentCategory(category);
        setMode("include");
    };

    const toggleIngredient = (ingredient: string, action: "include" | "exclude") => {
        const updater = action === "include" ? setIncludedIngredients : setExcludedIngredients;
        const other = action === "include" ? excludedIngredients : includedIngredients;
        updater((prev) => [...new Set([...prev, ingredient])]);
        if (action === "include") {
            setExcludedIngredients(other.filter((i) => i !== ingredient));
        } else {
            setIncludedIngredients(other.filter((i) => i !== ingredient));
        }
    };

    const saveAndProceed = () => {
        localStorage.setItem("includedIngredients", JSON.stringify(includedIngredients));
        localStorage.setItem("excludedIngredients", JSON.stringify(excludedIngredients));
        router.push("/confirmation");
    };

    if (!selectedOccasion) {
        return (
            <main className="p-6">
                <div className="text-[#FFFFFF] text-lg font-bold mb-4 rounded-full bg-[#FDBA74] text-center px-4 py-3">
                    What's the occasion?
                </div>
                <button
                    className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#FCA5A5] text-black text-lg font-bold mb-4 transition-all hover:bg-[#EF4444]"
                    onClick={() => router.push("/")}
                >
                    <span className="text-2xl">🏠</span>
                    <span className="flex-1 text-center">Home</span>
                    <span className="text-sm">🔍</span>
                </button>
                {["Breakfast", "Lunch", "Dinner", "Dessert"].map((o) => (
                    <button
                        key={o}
                        className="w-full max-w-xs py-4 mb-4 rounded-2xl bg-[#8ECAE6] text-lg font-bold text-black transition-all hover:bg-[#219EBC]"
                        onClick={() => handleOccasionSelect(o)}
                    >
                        {o}
                    </button>
                ))}
            </main>
        );
    }

    if (currentCategory && mode) {
        const label = mode === "include" ? "Add ingredients to include" : "Add ingredients to exclude";
        const ingredients = ingredientOptions[currentCategory];

        return (
            <main className="p-6">
                <div className="text-[#FFFFFF] text-lg font-bold mb-4 rounded-full bg-[#FDBA74] text-center px-4 py-3">
                    {label}
                </div>

                {ingredients.map((ing) => (
                    <button
                        key={ing}
                        onClick={() => toggleIngredient(ing, mode)}
                        className={`w-full max-w-xs py-4 mb-4 rounded-2xl text-lg font-bold transition-all ${
                            mode === "include"
                                ? includedIngredients.includes(ing)
                                    ? "bg-green-600 text-white"
                                    : "bg-[#B9FBC0] text-black hover:bg-green-400"
                                : excludedIngredients.includes(ing)
                                    ? "bg-red-600 text-white"
                                    : "bg-[#FCA5A5] text-black hover:bg-red-400"
                        }`}
                    >
                        {ing}
                    </button>
                ))}

                <div className="flex flex-col gap-4 mt-6">
                    {mode === "include" ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setMode("exclude")}
                        >
                            Next: Exclude ingredients
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setMode(null);
                                setCurrentCategory(null);
                            }}
                        >
                            Back to preferences
                        </button>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main className="p-6">
            <div className="text-[#FFFFFF] text-lg font-bold mb-4 rounded-full bg-[#FDBA74] text-center px-4 py-3">
                Choose your dietary restrictions:
            </div>

            {Object.keys(ingredientOptions).map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="w-full max-w-xs py-4 mb-4 rounded-2xl bg-[#8ECAE6] text-lg font-bold text-black transition-all hover:bg-[#219EBC]"
                >
                    {cat}
                </button>
            ))}

            <div className="flex flex-col gap-4 mt-6">
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setSelectedOccasion(null);
                        setSelectedCategories([]);
                        setCurrentCategory(null);
                    }}
                >
                    Go back
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={saveAndProceed}
                >
                    Confirm
                </button>
            </div>
        </main>
    );
}
