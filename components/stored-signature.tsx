'use client';

import { useEffect, useState } from 'react';
import { getStoredSignature } from '@/lib/module-signature';

export function StoredSignature() {
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    setSignature(getStoredSignature());
  }, []);

  if (!signature) return null;

  return (
    <img
      src={signature}
      alt="Training signature"
    />
  );
}