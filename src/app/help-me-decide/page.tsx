"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HelpMeDecide() {
    const router = useRouter();

    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

    const ingredientOptions: { [key: string]: string[] } = {
        Dairy: ["Milk", "Cheese", "Butter", "Yoghurt"],
        Vegetables: ["Cucumber", "Tomato", "Potato", "Carrot", "Spinach"],
        Meat: ["Beef", "Pork", "Mutton"]
    };

    const handleOccasionSelect = (occasion: string) => {
        setSelectedOccasion(occasion);
    };

    const handleCategorySelect = (category: string) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleIngredientChange = (ingredient: string, action: "include" | "exclude") => {
        if (action === "include") {
            setIncludedIngredients(prev =>
                prev.includes(ingredient) ? prev : [...prev, ingredient]
            );
            setExcludedIngredients(prev => prev.filter(item => item !== ingredient));
        } else {
            setExcludedIngredients(prev =>
                prev.includes(ingredient) ? prev : [...prev, ingredient]
            );
            setIncludedIngredients(prev => prev.filter(item => item !== ingredient));
        }
    };

    return (
        <div className="p-6">
            {!selectedOccasion ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">What's the occasion?</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {["Breakfast", "Lunch", "Dinner", "Dessert"].map((occasion) => (
                            <button
                                key={occasion}
                                onClick={() => handleOccasionSelect(occasion)}
                                className={`p-4 text-white rounded-md ${selectedOccasion === occasion ? "bg-green-700" : "bg-green-500"}`}
                            >
                                {occasion}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Pick your preferences.</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(ingredientOptions).map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={`p-4 text-white rounded-md ${selectedCategories.includes(category) ? "bg-green-700" : "bg-green-500"}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {selectedCategories.length > 0 && (
                        <div className="mt-6">
                            {selectedCategories.map((category) => (
                                <div key={category} className="mb-4">
                                    <h2 className="text-xl font-bold mb-2">{category}</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {ingredientOptions[category].map((ingredient) => (
                                            <div key={ingredient} className="p-4 bg-gray-200 rounded-md flex justify-between items-center">
                                                <span>{ingredient}</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleIngredientChange(ingredient, "include")}
                                                        className={`p-2 rounded-md ${includedIngredients.includes(ingredient) ? "bg-blue-700" : "bg-blue-500"}`}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => handleIngredientChange(ingredient, "exclude")}
                                                        className={`p-2 rounded-md ${excludedIngredients.includes(ingredient) ? "bg-red-700" : "bg-red-500"}`}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex justify-between">
                        <button onClick={() => setSelectedOccasion(null)} className="bg-orange-500 text-white p-4 rounded-md">
                            Go Back
                        </button>
                        <button onClick={() => router.push("/confirmation")} className="bg-green-500 text-white p-4 rounded-md">
                            Next Step
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
