"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
}

export default function GuidedCookingPage() {
    const { id } = useParams();
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const res = await axios.get<Recipe>(`${API_URL}/recipes/${id}`);
                setRecipe(res.data);
            } catch (err) {
                console.error("Error loading recipe:", err);
            }
        }

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div className="p-6">Loading...</div>;
    }

    const handleNext = () => {
        if (currentStep < recipe.steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const isEven = currentStep % 2 === 0;

    return (
        <main
            className="flex flex-col items-center justify-start w-full h-screen bg-[#FCFAF8] px-4 py-6 overflow-y-auto">
            <div className="flex flex-col items-center mb-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-2">{recipe.title}</h1>
                <p className="text-center text-md text-gray-800 mb-2">{recipe.description}</p>
                <p className="text-center text-md text-gray-700 mb-4">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>

                <div className="flex justify-between w-full gap-4 mb-4">
                    <button
                        className="flex-1 bg-[#FCA5A5] hover:bg-[#EF4444] text-white px-4 py-3 rounded-xl font-bold !text-xs"
                        onClick={() => router.push(`/recipes/${id}/cook`)}
                    >
                        Back
                    </button>
                    <button
                        className="flex-1 bg-[#FCD34D] hover:bg-[#FBBF24] text-white px-4 py-3 rounded-xl font-bold !text-xs"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                    >
                        Previous Step
                    </button>
                    <button
                        className="flex-1 bg-[#34D399] hover:bg-[#10B981] text-white px-4 py-3 rounded-xl font-bold !text-xs"
                        onClick={handleNext}
                        disabled={currentStep === recipe.steps.length - 1}
                    >
                        Next Step
                    </button>
                </div>
            </div>

            <div className="w-40 h-40 bg-blue-300 rounded-lg border border-black flex items-center justify-center mb-4">
                <span className="text-black">[Image]</span>
            </div>

            <div className="relative w-full max-w-md mt-4">
                <div
                    className={`bg-[#8EC5FF] text-white text-center font-bold text-lg px-6 py-6 rounded-full shadow-md w-full relative`}
                >
                    <p>
                        <span className="block text-sm mb-2">STEP {currentStep + 1}:</span>
                        {recipe.steps[currentStep]}
                    </p>

                    <svg
                        className={`absolute w-10 h-10 ${
                            isEven ? "-top-3 left-6" : "-top-3 right-6 rotate-y-180"
                        }`}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{transform: isEven ? "rotate(0deg)" : "scaleX(-1)"}}
                    >
                        <path
                            d="M0,40 C10,10 30,10 40,0"
                            fill="#8EC5FF"
                        />
                    </svg>
                </div>
            </div>

            <button
                className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#1E88E5] text-white text-lg font-bold mt-4 transition-all hover:bg-[#1565C0]"
                onClick={() => router.push("/")}
                hidden={currentStep !== recipe.steps.length - 1}
            >
                <span className="flex-1 text-center">Finish</span>
            </button>
        </main>
    );
}
