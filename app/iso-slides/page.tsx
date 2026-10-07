'use client';

import Slideshow from '@/components/slideshow';
import { useApp } from "@/components/app-context";
import { useRouter } from "next/navigation";
import { slides } from '@/components/slides';

export default function ISOSlides() {
    const { userData, setUserData } = useApp();
    const router = useRouter();
    
    function getSlides() {
        return slides(userData.name);
    }

    function esoLastSlide() {
        setUserData(prev => ({
            ...prev,
            enteredIsoModule: true
        }));

        localStorage.setItem("enteredIsoModule", "true");

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