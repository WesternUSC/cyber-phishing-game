'use client';

import { Certificate } from "@/components/slides";
import { useApp } from "@/components/app-context";

export default function CertificatePage() {
    const { userData } = useApp();

    return (
        <Certificate playerName={userData.name} />
    );
}