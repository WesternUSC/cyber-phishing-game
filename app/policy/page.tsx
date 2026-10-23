
import { Suspense } from 'react';
import PolicyPageClient from './policy-page-client';

export default function PoliciesPage() {
    return (
        <Suspense fallback={<div>Loading policy...</div>}>
            <PolicyPageClient />
        </Suspense>
    );
}
