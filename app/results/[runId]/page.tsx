'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, ShieldCheck, Trophy, RotateCcw } from 'lucide-react';
import { GameState } from '@/lib/types';
import { Email } from '@/lib/types';
import emailData from '@/data/emails.json';

const emails = emailData.emails as Email[];
const STORAGE_KEY = 'phishquest-run';

export default function ResultsPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setGameState(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  function handlePlayAgain() {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!gameState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc]">
        <p className="text-gray-500">Loading results…</p>
      </div>
    );
  }

  const totalCorrect = Object.values(gameState.decisions).filter((d) => d.correct).length;
  const total = emails.length;
  const pct = Math.round((totalCorrect / total) * 100);

  const grade =
    pct === 100 ? 'Perfect score!'
    : pct >= 80 ? 'Great job!'
    : pct >= 60 ? 'Getting there!'
    : 'Keep practicing!';

  const gradeColor =
    pct === 100 ? 'text-green-600'
    : pct >= 80 ? 'text-[#1a73e8]'
    : pct >= 60 ? 'text-yellow-600'
    : 'text-red-600';

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-4">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-7 w-7 text-[#EA4335]" />
        <span className="text-xl font-normal text-gray-700">
          Phish<span className="font-semibold text-[#EA4335]">Quest</span>
        </span>
      </div>

      <div className="mx-auto max-w-2xl">
        {/* Score card */}
        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f0fe]">
              <Trophy className="h-10 w-10 text-[#1a73e8]" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {totalCorrect}/{total}
          </h1>
          <p className={`mt-1 text-lg font-medium ${gradeColor}`}>{grade}</p>
          <p className="mt-2 text-sm text-gray-500">
            {gameState.playerName} &bull; {pct}% accuracy
          </p>

          {/* Progress bar */}
          <div className="mx-auto mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all ${
                pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Per-email breakdown */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Email breakdown</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {emails.map((email, index) => {
              const decision = gameState.decisions[email.id];
              const isCorrect = decision?.correct;

              return (
                <div key={email.id} className="flex items-start gap-4 px-6 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{email.subject}</p>
                        <p className="text-xs text-gray-500">{email.senderEmail}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            email.truth === 'phish'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {email.truth === 'phish' ? 'Phishing' : 'Safe'}
                        </span>
                        {decision ? (
                          isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )
                        ) : (
                          <span className="text-xs text-gray-400">Skipped</span>
                        )}
                      </div>
                    </div>
                    {!isCorrect && decision && (
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        {email.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Play again */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            onClick={handlePlayAgain}
            className="inline-flex items-center gap-2 rounded-lg bg-[#EA4335] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c5221f]"
          >
            <RotateCcw className="h-4 w-4" />
            Play again
          </Link>
        </div>
      </div>
    </div>
  );
}
