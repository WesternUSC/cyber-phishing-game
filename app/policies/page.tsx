'use client';

import { policiesSlides } from '@/components/slides-policies';
import { useApp } from "@/components/app-context";
import Slideshow from '@/components/slideshow';
import { customerServiceSlides } from '@/components/slides-customer-service';
import { useEffect } from 'react';

export default function PoliciesPage() {
    const { userData, setUserData } = useApp();

    useEffect(() => {
        const savedString = localStorage.getItem("currentSlideDeck");

        if (savedString !== null) {
            setUserData(prev => ({
                ...prev,
                currentSlideDeck: savedString
            }));
        }
    }, [setUserData]);

    const getSlides = () => {
        switch (userData.currentSlideDeck) {

            case 'policies':
                return policiesSlides(userData.name);

            case 'cs':
                return customerServiceSlides(userData.name);

            default:
                return policiesSlides(userData.name);
        }
    };

    return (
        <Slideshow
            slides={getSlides()}
            playerName={userData.name}
        />
    );
}