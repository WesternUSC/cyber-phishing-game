'use client';

import Selection from "@/components/selection";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-context";

export default function ModuleHomePage() {
    const { userData, setUserData } = useApp();

    const [madeSelection, setMadeSelection] = useState(false);
    const [selectedSlides, setSelectedSlides] = useState<'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict' | 'disc' | 'early' | 'job'>('eso');
    const [completedIsModule, setCompletedIsModule] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem("name");
        if (savedName !== null) {
            setUserData((prev) => ({
                ...prev,
                name: savedName,
            }));
        }

        const savedTitle = localStorage.getItem("title");
        if (savedTitle !== null) {
            setUserData((prev) => ({
                ...prev,
                title: savedTitle,
            }));
        }
    }, []);

    return (
        <Selection playerName={userData.name}
            title={userData.title}
            supervisor={userData.supervisor}
            scribe1={userData.scribe1}
            scribe2={userData.scribe2}
            scribe3={userData.scribe3}
            scribe4={userData.scribe4}
            scribe5={userData.scribe5}
            scribe6={userData.scribe6}
            scribe7={userData.scribe7}
            userEmail={userData.email}
            setMadeSelection={setMadeSelection} 
            setSelectedSlides={setSelectedSlides}
            seenCertificate={completedIsModule}
            resetGame={() => {}}
        />
    );
}