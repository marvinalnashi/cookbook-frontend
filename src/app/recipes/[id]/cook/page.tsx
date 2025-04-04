"use client";

import { useRouter, useParams } from "next/navigation";
import {useEffect} from "react";
import {speakVisibleText} from "@/utils/narrator";

export default function CookingModePage() {
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        speakVisibleText();
    }, []);

    return (
        <div className="p-6">
            <div className="w-32 h-32 object-center rounded-md mb-4 flex items-center justify-center">
                <img
                    src={"/ratwizard5.png"}
                    alt="Rat Wizard"
                    className="w-full h-auto"
                />
            </div>
            <h1 className="text-2xl font-bold mb-4">How do you want to cook?</h1>
            <div className="flex flex-col gap-4">
                <button
                    className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#B9FBC0] text-lg font-bold transition-all hover:bg-[#34D399] text-black hover:text-white"
                    onClick={() => router.push(`/recipes/${id}/cook/free-cooking`)}
                >
                    Free Cooking
                </button>
                <button
                    className="flex items-center justify-between gap-2 w-full max-w-xs px-4 py-4 rounded-2xl bg-[#B9FBC0] text-lg font-bold transition-all hover:bg-[#34D399] text-black hover:text-white"
                    onClick={() => router.push(`/recipes/${id}/cook/guided-cooking`)}
                >
                    Guided Cooking
                </button>
            </div>
        </div>
    );
}
