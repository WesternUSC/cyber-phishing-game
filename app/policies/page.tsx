'use client';

import { policiesSlides } from '@/components/slides-policies';
import { useApp } from "@/components/app-context";
import Slideshow from '@/components/slideshow';
import { customerServiceSlides } from '@/components/slides-customer-service';
import { accessibilitySlides } from '@/components/slides-accessibility';
import { conflictSlides } from '@/components/slides-conflict';
import { discSlides } from '@/components/slidesDisc';
import { earlySlides } from '@/components/slides-early';
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
        else {
            setUserData(prev => ({
                ...prev,
                currentSlideDeck: "policies"
            }));
        }
    }, [setUserData]);

    const getSlides = () => {
        switch (userData.currentSlideDeck) {

            case 'policies':
                return policiesSlides(userData.name);

            case 'cs':
                return customerServiceSlides(userData.name);

            case 'accessibility':
                return accessibilitySlides(userData.name);

            case 'conflict':
                return conflictSlides(userData.name);

            case 'disc':
                return discSlides(userData.name);

            case 'early':
                return earlySlides(userData.name);

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