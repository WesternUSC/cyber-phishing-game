'use client';

import { CheckCircle, XCircle, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  correct: boolean;
  explanation: string;
  evidence: string[];
}

export function FeedbackModal({ open, onClose, correct, explanation, evidence }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        
        <div
          className={`flex items-center gap-3 rounded-t-2xl px-6 py-5 ${
            explanation.includes("This email could be a phishing attempt")
              ? "bg-yellow-50"
              : correct
                ? "bg-green-50"
                : "bg-red-50"
          }`}
        >
          {correct ? (
            <CheckCircle className="h-8 w-8 shrink-0 text-green-600" />
          ) : (
            <XCircle className="h-8 w-8 shrink-0 text-red-600" />
          )}
          <div>
            {
              explanation.includes("This email could be a phishing attempt") ?
              <>
              <h2
              className={`text-lg font-semibold ${
                correct ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {correct ? 'Proceed with caution!' : 'Take a closer look'}
            </h2>
            <p className={`text-sm ${correct ? 'text-green-700' : 'text-red-700'}`}>
              {correct
                ? 'This email contains both legitimate and suspicious elements. Before taking any action, verify the request with the sender through a trusted method.'
                : 'This email contains both legitimate and suspicious elements. Before taking any action, verify the request with the sender through a trusted method.'}
            </p>
            </>
            :
            <>
            <h2
              className={`text-lg font-semibold ${
                correct ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {correct ? 'Correct!' : 'Not quite'}
            </h2>
            <p className={`text-sm ${correct ? 'text-green-700' : 'text-red-700'}`}>
              {correct
                ? 'Nice work — you spotted it correctly.'
                : 'Review the clues below and keep it in mind next time.'}
            </p>
            </>
            }
            
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1 hover:bg-black/10"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-700">{explanation}</p>

          {evidence.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Key clues
              </p>
              <ul className="flex flex-col gap-2">
                {evidence.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                        correct ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557b0]"
          >
            Continue to next email
          </button>
        </div>
      </div>
    </div>
  );
}
