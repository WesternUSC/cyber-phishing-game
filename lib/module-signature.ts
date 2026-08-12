const SIGNATURE_STORAGE_KEY = 'phishquest-training-signature';

export function saveSignature(signatureDataUrl: string) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(SIGNATURE_STORAGE_KEY, signatureDataUrl);
}

export function getStoredSignature(): string | null {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem(SIGNATURE_STORAGE_KEY);
}

export function clearStoredSignature() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(SIGNATURE_STORAGE_KEY);
}

/*
TO GET SIGNATURE FROM ANOTHER PAGE:

import { getStoredSignature } from '@/lib/module-signature';

const signature = getStoredSignature();

<img src={signature ?? ''} alt="Training signature" />
*/