'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CompromisedModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-2xl">
        {/* Red header bar */}
        <div className="flex items-center justify-between bg-red-600 px-5 py-3">
          <span className="text-sm font-bold uppercase tracking-widest text-white">
            ⚠ Security Alert
          </span>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white hover:bg-white/20 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* GIF */}
        <div className="relative w-full">
          <Image
            src="/Compromised.gif"
            alt="You have been compromised"
            width={480}
            height={270}
            className="w-full"
            unoptimized
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-950 px-5 py-4 text-center">
          <p className="text-sm text-red-400 font-semibold">
            You clicked a phishing link — this email has been marked as failed.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            In a real scenario, clicking this link could have compromised your account or device.
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            I understand — close
          </button>
        </div>
      </div>
    </div>
  );
}
