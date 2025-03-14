"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Fix for App Router

export default function HelpMeDecide() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [occasion, setOccasion] = useState<string | null>(null);
    const [preferences, setPreferences] = useState<string[]>([]);

    return (
        <div className="p-6">
            {step === 1 && (
                <>
                    <h1 className="text-2xl font-bold mb-4">What is the occasion?</h1>
                    <div className="flex flex-wrap gap-4">
                        {["Breakfast", "Lunch", "Dinner", "Dessert"].map((item) => (
                            <button key={item} className="px-6 py-3 bg-green-500 text-white rounded-md"
                                    onClick={() => { setOccasion(item); setStep(step + 1); }}>
                                {item}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Pick your preferences.</h1>
                    <div className="flex flex-wrap gap-4">
                        {["Dairy", "Vegetables", "Meat"].map((category) => (
                            <button key={category} className="px-6 py-3 bg-green-500 text-white rounded-md"
                                    onClick={() => setPreferences([...preferences, category])}>
                                {category}
                            </button>
                        ))}
                    </div>
                    <button className="px-6 py-3 bg-orange-500 text-white rounded-md mt-4"
                            onClick={() => setStep(step + 1)}>
                        Next Step
                    </button>
                </>
            )}
            {step === 3 && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Confirmation</h1>
                    <p>Occasion: {occasion}</p>
                    <p>Preferences: {preferences.join(", ")}</p>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-md mt-4"
                            onClick={() => router.push(`/recipes?occasion=${occasion}&preferences=${preferences.join(",")}`)}>
                        Submit
                    </button>
                </>
            )}
        </div>
    );
}
