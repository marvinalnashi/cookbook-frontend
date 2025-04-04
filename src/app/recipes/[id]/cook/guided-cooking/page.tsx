"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import confetti, { Shape } from "canvas-confetti";
import { speakVisibleText } from "@/utils/narrator";

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
    const [isFinishing, setIsFinishing] = useState<boolean>(false);
    const [hasNarratedIntro, setHasNarratedIntro] = useState<boolean>(false);

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

    useEffect(() => {
        if (recipe && !hasNarratedIntro) {
            speakVisibleText();
            setHasNarratedIntro(true);
        }
    }, [recipe]);

    useEffect(() => {
        if (recipe && hasNarratedIntro) {
            const stepElement = document.querySelector(".bubble-pop");
            if (stepElement) {
                const utterance = new SpeechSynthesisUtterance(stepElement.textContent || "");
                utterance.volume = parseFloat(localStorage.getItem("sfxVolume") || "0.7");
                window.speechSynthesis.speak(utterance);
            }
        }
    }, [currentStep]);

    const handleNext = () => {
        if (recipe && currentStep < recipe.steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    function launchMagicSparkles() {
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.92,
            startVelocity: 30,
            colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
            origin: { y: 0.5 },
        };

        const starShape = ["star"] as Shape[];
        const circleShape = ["circle"] as Shape[];

        function shoot() {
            confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: starShape });
            confetti({ ...defaults, particleCount: 20, scalar: 0.8, shapes: circleShape });
        }

        shoot();
        setTimeout(shoot, 200);
        setTimeout(shoot, 400);
    }

    if (!recipe) return <div className="p-6">Loading...</div>;

    const isEven = currentStep % 2 === 0;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === recipe.steps.length - 1;

    return (
        <main className="flex flex-col items-center justify-start w-full px-4 py-6 overflow-y-auto">
            <div className="flex flex-col items-center mb-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-2">{recipe.title}</h1>
                <p className="text-center text-md mb-2">{recipe.description}</p>
                <p className="text-center text-md mb-4">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>

                <div className="flex justify-between w-full gap-4 mb-4">
                    {isFirstStep && (
                        <>
                            <button
                                className="flex-1 bg-[#FCA5A5] hover:bg-[#EF4444] transition-all px-4 py-3 rounded-xl font-bold !text-xs text-black hover:text-white"
                                onClick={() => router.push(`/recipes/${id}/cook`)}
                            >
                                Back
                            </button>
                            <button
                                className="flex-1 bg-[#B9FBC0] hover:bg-[#34D399] transition-all px-4 py-3 rounded-xl font-bold !text-xs text-black hover:text-white"
                                onClick={handleNext}
                            >
                                Next Step
                            </button>
                        </>
                    )}

                    {!isFirstStep && !isLastStep && (
                        <>
                            <button
                                className="flex-1 bg-[#FDD87A] hover:bg-[#FBBF24] transition-all px-4 py-3 rounded-xl font-bold !text-xs text-black hover:text-white"
                                onClick={handlePrev}
                            >
                                Previous Step
                            </button>
                            <button
                                className="flex-1 bg-[#B9FBC0] hover:bg-[#34D399] transition-all px-4 py-3 rounded-xl font-bold !text-xs text-black hover:text-white"
                                onClick={handleNext}
                            >
                                Next Step
                            </button>
                        </>
                    )}

                    {isLastStep && (
                        <button
                            className="flex-1 bg-[#FDD87A] hover:bg-[#FBBF24] transition-all px-4 py-3 rounded-xl font-bold !text-xs text-black hover:text-white"
                            onClick={handlePrev}
                        >
                            Previous Step
                        </button>
                    )}
                </div>
            </div>

            <div key={currentStep} className="relative w-full max-w-md mt-30">
                {!isFinishing && (
                    <div
                        className={`absolute -top-40 z-10 w-40 transition-all duration-500 ${isEven ? "left-0" : "right-0"}`}
                    >
                        <img
                            src={`/ratwizard${isEven ? "1" : "2"}.png`}
                            alt="Rat wizard mascotte"
                            className="w-full h-auto"
                        />
                    </div>
                )}

                {isFinishing && (
                    <div className="absolute -top-40 z-20 w-44 left-1/2 transform -translate-x-1/2 transition-all duration-500">
                        <img
                            src="/ratwizard3.png"
                            alt="Rat wizard casting"
                            className="w-full h-auto"
                        />
                    </div>
                )}

                <div className="bg-[#8EC5FF] text-center font-bold text-lg px-6 py-6 rounded-full shadow-md w-full relative bubble-pop">
                    <p>
                        <span className="block text-sm mb-2">STEP {currentStep + 1}:</span>
                        {recipe.steps[currentStep]}
                    </p>

                    <svg
                        className={`absolute w-12 h-12 ${isEven ? "-top-5 left-4" : "-top-5 right-4"}`}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: isEven ? "scaleX(1)" : "scaleX(-1)" }}
                    >
                        <path d="M0,40 C10,10 30,10 40,0" fill="#8EC5FF" />
                    </svg>
                </div>
            </div>

            {isLastStep && (
                <button
                    className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#1E88E5] text-lg font-bold mt-4 transition-all hover:bg-[#1565C0]"
                    onClick={() => {
                        setIsFinishing(true);
                        launchMagicSparkles();
                        setTimeout(() => router.push("/"), 1500);
                    }}
                >
                    <span className="flex-1 text-center text-white">Finish</span>
                </button>
            )}
        </main>
    );
}
