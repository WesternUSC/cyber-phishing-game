
'use client';

import { Suspense } from 'react';
import PolicyPageClient from './policy-page-client';

export default function PoliciesPage() {
    return (
        <div
            style={{
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Suspense fallback={<div>Loading policy...</div>}>
                <PolicyPageClient />
            </Suspense>
        </div>
    );
}
