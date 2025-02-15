"use client";  // ✅ Only this component runs on the client

import { useState, useEffect } from "react";
import Preloader from "./Preloader"; // Keep your existing preloader

export default function PreloaderWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const handleComplete = () => {
        setIsLoading(false);
        setTimeout(() => {
            setShowContent(true);
        }, 500);
    };

    return (
        <>
            {isLoading && <Preloader onComplete={handleComplete} />}
            <main
                style={{
                    opacity: showContent ? 1 : 0,
                    transition: "opacity 0.5s ease-in",
                    visibility: showContent ? "visible" : "hidden",
                }}
            >
                {children}
            </main>
        </>
    );
}
