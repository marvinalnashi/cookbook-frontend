"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import confetti, { Shape } from "canvas-confetti";
import {speakVisibleText} from "@/utils/narrator";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://little-chefs-cookbook-production.up.railway.app";

interface Recipe {
    id: number;
    title: string;
    description: string;
    occasion: string;
    ingredients: string[];
    steps: string[];
    duration: number;
}

export default function FreeCookingPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [finished, setFinished] = useState<boolean>(false);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            setError("Invalid recipe ID.");
            return;
        }

        axios.get(`${API_URL}/recipes/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setRecipe(response.data);
                    setError(null);
                    speakVisibleText();
                }
            })
            .catch((err) => {
                console.error("Error fetching recipe:", err);
                setError("Recipe not found.");
            });
    }, [id]);

    function launchMagicSparkles() {
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.92,
            startVelocity: 30,
            colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
            origin: { y: 0.5 }
        };

        const starShape = ['star'] as Shape[];
        const circleShape = ['circle'] as Shape[];

        function shoot() {
            confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: starShape });
            confetti({ ...defaults, particleCount: 20, scalar: 0.8, shapes: circleShape });
        }

        shoot();
        setTimeout(shoot, 200);
        setTimeout(shoot, 400);
    }

    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!recipe) return <p className="p-6">Loading recipe...</p>;

    return (
        <main className="flex flex-col items-center justify-start w-full px-4 py-6 overflow-y-auto">
            <div className="relative w-full max-w-md mt-6">
                <div className="absolute -top-36 left-1/2 transform -translate-x-1/2 z-10 w-32 h-auto mt-32">
                    <img
                        src={finished ? "/ratwizard3.png" : "/ratwizard4.png"}
                        alt="Rat Wizard"
                        className="w-full h-auto"
                    />
                </div>

                <div className="relative bg-[#8EC5FF] text-white font-bold text-md p-6 mt-32 rounded-3xl shadow-md w-full bubble-pop">
                    <svg
                        className="absolute w-12 h-12 -top-4 left-6"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0,40 C10,10 30,10 40,0" fill="#8EC5FF" />
                    </svg>

                    {!finished && (
                        <>
                            <h1 className="text-2xl text-white mb-2">{recipe.title}</h1>
                            <p className="text-white mb-4">{recipe.description}</p>
                            <h2 className="text-lg mt-4">Duration</h2>
                            <div className="text-white mb-4">{recipe.duration} minutes</div>
                            <h2 className="text-lg mt-4">Ingredients</h2>
                            <ul className="list-disc ml-6 text-white mb-4">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>

                            <h2 className="text-lg mt-4">Preparation Steps</h2>
                            <ol className="list-decimal ml-6 text-white">
                                {recipe.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
            </div>

            {!finished && (
                <>
                    <button
                        onClick={() => router.back()}
                        className="mt-6 bg-gray-500 text-white p-4 rounded-xl font-bold w-full max-w-xs"
                    >
                        Back
                    </button>

                    <button
                        className="mt-4 bg-[#1E88E5] hover:bg-[#1565C0] text-white p-4 rounded-xl font-bold w-full max-w-xs"
                        onClick={() => {
                            setFinished(true);
                            launchMagicSparkles();
                            setTimeout(() => router.push("/"), 1500);
                        }}
                    >
                        Finish
                    </button>
                </>
            )}
        </main>
    );
}
