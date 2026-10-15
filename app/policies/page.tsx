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
import { createPolicySlides } from '@/components/policy-slide-deck';
import questionsData from '@/data/questions.json';
import csSlidesData from '@/data/customerServiceSlides.json'
import policiesSlidesData from '@/data/policiesSlides.json'
import accessibilitySlidesData from '@/data/accessibility.json'
import conflictSlidesData from '@/data/conflict.json'
import discSlidesData from '@/data/discSlides.json'
import earlySlidesData from '@/data/earlySlides.json'
import emergencySlidesData from '@/data/emergencySlides.json'
import hazardSlidesData from '@/data/hazardSlides.json'
import hsrmSlidesData from '@/data/hsrmSlides.json'
import hsrwSlidesData from '@/data/hsrwSlides.json'
import hswrpSlidesData from '@/data/hswrpSlides.json'
import housekeepingSlidesData from '@/data/housekeepingSlides.json'
import injurySlidesData from '@/data/injurySlides.json'
import mediaSlidesData from '@/data/mediaSlides.json'
import disconnectSlidesData from '@/data/disconnectSlides.json'
import socialSlidesData from '@/data/socialSlides.json'
import visitorSlidesData from '@/data/visitorSlides.json'
import whistleblowerSlidesData from '@/data/whistleblowerSlides.json'

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
        //return createPolicySlides(csSlidesData, questionsData.questionsCustomerService, userData.name, "cs");

        switch (userData.currentSlideDeck) {

            case 'policies':
                return createPolicySlides(policiesSlidesData, questionsData.questionsAcceptableUse, userData.name, "policies", "acceptable-use-score");

            case 'cs':
                return createPolicySlides(csSlidesData, questionsData.questionsCustomerService, userData.name, "cs", "cs-score");

            case 'accessibility':
                return createPolicySlides(accessibilitySlidesData, questionsData.questionsAccessibility, userData.name, "accessibility", "accessibility-score");

            case 'conflict':
                return createPolicySlides(conflictSlidesData, questionsData.questionsConflict, userData.name, "conflict", "conflict-score");

            case 'disc':
                return createPolicySlides(discSlidesData, questionsData.questionsDisc, userData.name, "disc", "disc-score");

            case 'early':
                return createPolicySlides(earlySlidesData, questionsData.questionsEarly, userData.name, "early", "early-score");

            case 'emergency':
                return createPolicySlides(emergencySlidesData, questionsData.questionsEmergency, userData.name, "emergency", "emergency-score");

            case 'hazard':
                return createPolicySlides(hazardSlidesData, questionsData.questionsHazard, userData.name, "hazard", "hazard-score");

            case 'hsrm':
                return createPolicySlides(hsrmSlidesData, questionsData.questionsHsrm, userData.name, "hsrm", "hsrm-score");

            case 'hsrw':
                return createPolicySlides(hsrwSlidesData, questionsData.questionsHsrw, userData.name, "hsrw", "hsrw-score");

            case 'hswrp':
                return createPolicySlides(hswrpSlidesData, questionsData.questionsHswrp, userData.name, "hswrp", "hswrp-score");

            case 'housekeeping':
                return createPolicySlides(housekeepingSlidesData, questionsData.questionsHousekeeping, userData.name, "housekeeping", "housekeeping-score");

            case 'injury':
                return createPolicySlides(injurySlidesData, questionsData.questionsInjury, userData.name, "injury", "injury-score");

            case 'media':
                return createPolicySlides(mediaSlidesData, questionsData.questionsMedia, userData.name, "media", "media-score");

            case 'disconnect':
                return createPolicySlides(disconnectSlidesData, questionsData.questionsDisconnect, userData.name, "disconnect", "disconnect-score");

            case 'social':
                return createPolicySlides(socialSlidesData, questionsData.questionsSocial, userData.name, "social", "social-score");

            case 'visitor':
                return createPolicySlides(visitorSlidesData, questionsData.questionsVisitor, userData.name, "visitor", "visitor-score");

            case 'whistleblower':
                return createPolicySlides(whistleblowerSlidesData, questionsData.questionsWhistleblower, userData.name, "whistleblower", "whistleblower-score");

            default:
                return createPolicySlides(policiesSlidesData, questionsData.questionsAcceptableUse, userData.name, "policies", "acceptable-use-score");
        }
    };

    return (
        <Slideshow
            slides={getSlides()}
            playerName={userData.name}
        />
    );
}