'use client';

import { scribesSlides } from '@/components/scribes-slides';
import Slideshow from '@/components/slideshow';
import { useEffect } from 'react';

import { useApp } from "@/components/app-context";

export default function JobTrainingPage() {
    const { userData, setUserData } = useApp();

    useEffect(() => {
        const scribe1 = localStorage.getItem("scribe1") ?? "";
        const scribe2 = localStorage.getItem("scribe2") ?? "";
        const scribe3 = localStorage.getItem("scribe3") ?? "";
        const scribe4 = localStorage.getItem("scribe4") ?? "";
        const scribe5 = localStorage.getItem("scribe5") ?? "";
        const scribe6 = localStorage.getItem("scribe6") ?? "";
        const scribe7 = localStorage.getItem("scribe7") ?? "";

        setUserData((prev) => ({
            ...prev,
            scribe1: scribe1,
            scribe2: scribe2,
            scribe3: scribe3,
            scribe4: scribe4,
            scribe5: scribe5,
            scribe6: scribe6,
            scribe7: scribe7,
            }));
    }, []);

    function getSlides() {
        return (scribesSlides("", userData.scribe1, userData.scribe2, userData.scribe3, userData.scribe4, userData.scribe5, userData.scribe6, userData.scribe7));
    }

    return (
        <Slideshow
            slides={getSlides()}
            playerName=""
        />
    );
}