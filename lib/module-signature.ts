const SIGNATURE_STORAGE_KEY = 'phishquest-training-signature';

export function saveSignature(signatureDataUrl: string) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(SIGNATURE_STORAGE_KEY, signatureDataUrl);
}

export function getStoredSignature(): string | null {
  if (typeof window === 'undefined') return null;

  return window.localStorage.getItem(SIGNATURE_STORAGE_KEY);
}

export function clearStoredSignature() {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(SIGNATURE_STORAGE_KEY);
}