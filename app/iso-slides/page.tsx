'use client';

import Slideshow from '@/components/slideshow';
import { useApp } from "@/components/app-context";
import { useRouter } from "next/navigation";
import { slides } from '@/components/slides';
import { useState } from 'react';

export default function ISOSlides() {
    const { userData } = useApp();
    const router = useRouter();
    const [completedIsModule, setCompletedIsModule] = useState(false);

    function goHome() {
        router.push("home");
    }
    
    function getSlides() {
        return slides(userData.name);
    }

    function esoLastSlide() {
        router.push("/desktop-simulator");
    }

    return (
        <Slideshow
            slides={getSlides()}
            playerName={userData.name}
            onLastSlide={() => {
                esoLastSlide();
            }}
        />
    );
}