"use client";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    useKeyboardNavigation();
    return <>{children}</>;
}