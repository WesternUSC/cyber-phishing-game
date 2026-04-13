'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { InboxList } from '@/components/inbox-list';
import { EmailViewer } from '@/components/email-viewer';
import { FeedbackModal } from '@/components/feedback-modal';
import { gameReducer, initialGameState } from '@/lib/game';
import { Email } from '@/lib/types';
import emailData from '@/data/emails.json';

const emails = emailData.emails as Email[];
const STORAGE_KEY = 'phishquest-run';

export default function HomePage() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [nameInput, setNameInput] = useState('');
  const [feedback, setFeedback] = useState<{
    open: boolean;
    correct: boolean;
    explanation: string;
    evidence: string[];
  }>({ open: false, correct: false, explanation: '', evidence: [] });
  const openedAtRef = useRef<number>(Date.now());
  const router = useRouter();

  // Hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        dispatch({ type: 'HYDRATE', state: JSON.parse(raw) });
      } catch {
        // ignore corrupt state
      }
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (state.started) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Navigate to results when all emails reviewed
  useEffect(() => {
    if (state.started && state.reviewed.length === emails.length) {
      router.push(`/results/${state.runId}`);
    }
  }, [state.started, state.reviewed.length, state.runId, router]);

  const currentEmail = emails.find((e) => e.id === state.currentEmailId);
  const score = Object.values(state.decisions).filter((d) => d.correct).length;

  function start() {
    const runId = crypto.randomUUID();
    dispatch({
      type: 'START',
      name: nameInput.trim() || 'Analyst',
      firstEmailId: emails[0].id,
      runId,
    });
    openedAtRef.current = Date.now();
  }

  function handleSelectEmail(id: string) {
    dispatch({ type: 'OPEN_EMAIL', emailId: id });
    openedAtRef.current = Date.now();
  }

  function handleSubmit(decision: 'phish' | 'safe') {
    if (!currentEmail) return;
    const correct = currentEmail.truth === decision;
    const ms = Date.now() - openedAtRef.current;
    dispatch({
      type: 'SUBMIT_DECISION',
      payload: { emailId: currentEmail.id, decision, correct, ms },
    });
    setFeedback({
      open: true,
      correct,
      explanation: currentEmail.explanation,
      evidence: currentEmail.evidence,
    });
  }

  function handleFeedbackClose() {
    setFeedback((s) => ({ ...s, open: false }));
    // Auto-advance to next unreviewed email
    const nextEmail = emails.find(
      (e) => !state.reviewed.includes(e.id) && e.id !== currentEmail?.id,
    );
    if (nextEmail) {
      dispatch({ type: 'OPEN_EMAIL', emailId: nextEmail.id });
      openedAtRef.current = Date.now();
    }
  }

  // Name entry screen
  if (!state.started) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4f2584]">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">PhishQuest</h1>
            <p className="text-sm text-gray-600">
              Train your eye to spot phishing emails. You&apos;ll review{' '}
              <strong>{emails.length} emails</strong> — decide if each one is a threat or
              legitimate.
            </p>
          </div>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && start()}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
            autoFocus
          />
          <button
            onClick={start}
            className="mt-4 w-full rounded-lg bg-[#4f2584] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c5221f]"
          >
            Open my inbox
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f6f8fc]">
      <AppShell
        playerName={state.playerName}
        score={score}
        total={state.reviewed.length}
      />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-gray-200 bg-white p-2 lg:flex">
          <div className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 bg-[#e8f0fe] text-[#1a73e8]">
            Inbox
            <span className="ml-2 text-xs font-normal">
              {emails.length - state.reviewed.length} remaining
            </span>
          </div>
          <div className="mt-4 px-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Progress
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#1a73e8] transition-all"
                style={{ width: `${(state.reviewed.length / emails.length) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {state.reviewed.length} of {emails.length} reviewed
            </p>
          </div>
          <div className="mt-4 px-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Score
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {score}
              <span className="text-sm font-normal text-gray-500">/{state.reviewed.length}</span>
            </p>
          </div>
        </aside>

        {/* Email list */}
        <div className="w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white lg:w-80">
          <div className="border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-700">
              Inbox — {state.playerName}
            </h2>
            <p className="text-xs text-gray-500">
              {emails.length} training emails
            </p>
          </div>
          <InboxList
            emails={emails}
            selectedId={state.currentEmailId}
            reviewed={state.reviewed}
            decisions={state.decisions}
            onSelect={handleSelectEmail}
          />
        </div>

        {/* Email viewer */}
        <main className="flex flex-1 flex-col overflow-hidden bg-white">
          <EmailViewer
            email={currentEmail}
            isReviewed={currentEmail ? state.reviewed.includes(currentEmail.id) : false}
            onSubmit={handleSubmit}
          />
        </main>
      </div>

      <FeedbackModal
        open={feedback.open}
        onClose={handleFeedbackClose}
        correct={feedback.correct}
        explanation={feedback.explanation}
        evidence={feedback.evidence}
      />
    </div>
  );
}
