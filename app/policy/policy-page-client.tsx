'use client';

import { useApp } from "@/components/app-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import { createPolicySlides } from '@/components/policy-slide-deck';
import questionsData from '@/data/questions.json';
import csSlidesData from '@/data/customerServiceSlides.json'
import policiesSlidesData from '@/data/policiesSlides.json'
import accessibilitySlidesData from '@/data/accessibility.json'
import conflictSlidesData from '@/data/conflict.json'
import discSlidesData from '@/data/discSlides.json'
import disc2SlidesData from '@/data/disc2.json'
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
import workplaceSlidesData from '@/data/workplaceSlides.json'
import profSlidesData from '@/data/profSlides.json'
import BookSlideViewer from '@/components/book-slide-viewer';

export default function PolicyPageClient() {
    const { userData, setUserData } = useApp();
    const searchParams = useSearchParams();

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
        switch (searchParams.get("policy")) {

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

            case 'disc2':
                return createPolicySlides(disc2SlidesData, questionsData.questionsDisc2, userData.name, "disc2", "disc2-score");

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

            case 'workplace':
                return createPolicySlides(workplaceSlidesData, questionsData.questionsWorkplace, userData.name, "workplace", "workplace-score");

            case 'prof':
                return createPolicySlides(profSlidesData, questionsData.questionsProf, userData.name, "prof", "prof-score");

            default:
                return createPolicySlides(policiesSlidesData, questionsData.questionsAcceptableUse, userData.name, "policies", "acceptable-use-score");
        }
    };

    const policyTitles: Record<string, string> = {
        policies: "Acceptable Use Policy",
        cs: "Accessibility for Customer Service Policy",
        accessibility: "Accessibility Policy",
        conflict: "Conflict of Interest Policy for USC Paid Employees",
        disc: "Discrimination Harassment and Violence Prevention Policy",
        disc2: "Discrimination Harassment and Violence Reporting Procedure",
        early: "Early and Safe Return to Work Policy",
        emergency: "Emergency Preparedness Policy",
        hazard: "Hazard Reporting Policy",
        hsrm: "Health and Safety Responsibilities of Managers & Supervisors Policy",
        hsrw: "Health and Safety Responsibilities of Workers (Including Supplied Labour) Policy",
        hswrp: "Health and Safety Work Refusal Policy",
        housekeeping: "Housekeeping and Organizing Policy",
        injury: "Injury/Illness Reporting Policy",
        media: "Media Spokesperson Policy",
        disconnect: "Right to Disconnect Policy for USC Paid Employees",
        social: "Social Media Policy",
        visitor: "Visitor Policy",
        whistleblower: "Whistleblower Policy",
        workplace: "Workplace Conduct Policy",
        prof: "Professional Development Procedure",
        eso: "Short Term Flexibility Procedure",
    };

    return (
        <BookSlideViewer slides={getSlides()} policyTitle={policyTitles[searchParams.get("policy") ?? "eso"]} />
    );
}