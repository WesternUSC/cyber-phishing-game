'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const [introSeen, setIntroSeen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [clockStr, setClockStr] = useState('');
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

  // Taskbar clock (client-only to avoid hydration mismatch)
  useEffect(() => {
    const fmt = () =>
      setClockStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    fmt();
    const id = setInterval(fmt, 15_000);
    return () => clearInterval(id);
  }, []);

  const currentEmail = emails.find((e) => e.id === state.currentEmailId);
  const score = Object.values(state.decisions).filter((d) => d.correct).length;
  const progressPct = emails.length > 0 ? state.reviewed.length / emails.length : 0;

  function start() {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameError(true);
      return;
    }
    setNameError(false);
    const runId = crypto.randomUUID();
    dispatch({ type: 'START', name: trimmed, firstEmailId: emails[0].id, runId });
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
    dispatch({ type: 'SUBMIT_DECISION', payload: { emailId: currentEmail.id, decision, correct, ms } });
    setFeedback({ open: true, correct, explanation: currentEmail.explanation, evidence: currentEmail.evidence });
  }

  function handleFeedbackClose() {
    setFeedback((s) => ({ ...s, open: false }));
    const nextEmail = emails.find(
      (e) => !state.reviewed.includes(e.id) && e.id !== currentEmail?.id,
    );
    if (nextEmail) {
      dispatch({ type: 'OPEN_EMAIL', emailId: nextEmail.id });
      openedAtRef.current = Date.now();
    }
  }

  // ── Intro screen ────────────────────────────────────────────────────────────
  if (!introSeen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Image src="/usc-logo.png" alt="USC Logo" width={80} height={80} />
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to PhishQuest</h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4f2584]">
              USC Information Security Training
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-800">PhishQuest</strong> is a cybersecurity awareness
              training exercise developed by the USC. It is designed
              to help students, faculty, and staff sharpen their ability to recognize phishing
              attempts and other email-based threats before they cause real harm.
            </p>
            <p>
              You will be shown{' '}
              <strong className="text-gray-800">{emails.length} simulated emails</strong>. For each
              one, decide whether it is a{' '}
              <strong className="text-red-600">phishing attempt</strong> or a{' '}
              <strong className="text-green-700">legitimate message</strong>. After every decision
              you will receive instant feedback explaining the clues that gave it away.
            </p>
            <p>
              Real phishing attacks can be extremely convincing — the goal of this exercise is to
              train your eye to notice subtle warning signs such as spoofed senders, urgent language,
              mismatched URLs, and unusual requests.
            </p>
            {/* 
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <strong>Note:</strong> All emails shown here are simulated for training purposes only.
              Do not attempt to visit any URLs displayed in this exercise outside of this
              environment.
            </div> 
            */}
          </div>

          <button
            onClick={() => setIntroSeen(true)}
            className="mt-6 w-full rounded-lg bg-[#4f2584] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d1d68]"
          >
            I understand
          </button>
        </div>
      </div>
    );
  }

  // ── Name entry screen ───────────────────────────────────────────────────────
  if (!state.started) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Image src="/usc-logo.png" alt="USC Logo" width={72} height={72} />
            <h1 className="text-2xl font-semibold text-gray-900">PhishQuest</h1>
            <p className="text-sm text-gray-600">
              Enter your name to begin. Your results will be saved at the end.
            </p>
          </div>

          <input
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (nameError) setNameError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && start()}
            placeholder="Enter your name"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
              nameError
                ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                : 'border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]/20'
            }`}
            autoFocus
          />
          {nameError && (
            <p className="mt-1.5 text-xs text-red-500">Please enter your name to continue.</p>
          )}

          <button
            onClick={start}
            className="mt-4 w-full rounded-lg bg-[#4f2584] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d1d68]"
          >
            Open my inbox
          </button>
        </div>
      </div>
    );
  }

  // ── Game screen (Windows 11 desktop) ────────────────────────────────────────
  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 15% 65%, #1d4ed8 0%, transparent 52%), ' +
          'radial-gradient(ellipse at 82% 18%, #7c3aed 0%, transparent 52%), ' +
          'radial-gradient(ellipse at 58% 88%, #be185d 0%, transparent 48%), ' +
          'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
      }}
    >
      {/* Desktop area — sits above the taskbar */}
      <div className="flex h-[calc(100vh-3rem)] items-center justify-center p-5">
        {/* Floating app window */}
        <div className="flex h-95/100 w-95/100 flex-col overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.65)]">

          {/* Windows 11 title bar */}
          <div className="flex h-9 shrink-0 select-none items-center bg-[#202020] px-4">
            <div className="flex items-center gap-2">
              <Image src="/usc-logo.png" alt="" width={14} height={14} className="opacity-75" />
              <span className="text-xs text-white/55">PhishQuest — Inbox</span>
            </div>
            <div className="ml-auto flex items-center">
              {/* Minimize */}
              <button
                aria-label="Minimize"
                className="flex h-9 w-11 items-center justify-center text-white/50 transition-colors hover:bg-white/10"
              >
                <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
                  <rect width="10" height="1" />
                </svg>
              </button>
              {/* Maximize */}
              <button
                aria-label="Maximize"
                className="flex h-9 w-11 items-center justify-center text-white/50 transition-colors hover:bg-white/10"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x=".6" y=".6" width="8.8" height="8.8" />
                </svg>
              </button>
              {/* Close */}
              <button
                aria-label="Close"
                className="flex h-9 w-11 items-center justify-center text-white/50 transition-colors hover:bg-red-600 hover:text-white"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="1" y1="1" x2="9" y2="9" />
                  <line x1="9" y1="1" x2="1" y2="9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Gmail-style header */}
          <AppShell playerName={state.playerName} score={score} total={state.reviewed.length} />

          {/* Main layout */}
          <div className="flex flex-1 overflow-hidden">

            {/* Left sidebar — vertical progress */}
            <aside className="hidden w-40 shrink-0 flex-col gap-5 border-r border-gray-200 bg-white p-4 lg:flex">
              <div className="rounded-full bg-[#e8f0fe] px-4 py-2 text-sm font-medium text-[#1a73e8]">
                Inbox
                <span className="ml-2 text-xs font-normal">
                  {emails.length - state.reviewed.length} left
                </span>
              </div>

              {/* Vertical progress bar */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Progress
                </p>
                <div className="flex items-start gap-3">
                  {/* Bar */}
                  <div className="relative mt-1 h-82 w-6 shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-full bg-[#1a73e8] transition-all duration-500"
                      style={{ height: `${progressPct * 100}%` }}
                    />
                  </div>
                  {/* Labels */}
                  <div className="flex h-82 flex-col justify-between text-xs text-gray-400">
                    <span className="font-medium">{emails.length}</span>
                    <span className="text-base font-bold text-[#1a73e8]">
                      {state.reviewed.length}
                    </span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {Math.round(progressPct * 100)}% complete
                </p>
              </div>

              {/* Score */}
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Score
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {score}
                  <span className="text-sm font-normal text-gray-500">
                    /{state.reviewed.length}
                  </span>
                </p>
              </div>
            </aside>

            {/* Email list */}
            <div className="w-80 shrink-0 overflow-y-auto border-r border-gray-200 bg-white lg:w-96">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Inbox — {state.playerName}
                </h2>
                <p className="text-xs text-gray-500">{emails.length} training emails</p>
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
                onPhishLinkClicked={() => handleSubmit('safe')}
              />
            </main>
          </div>
        </div>
      </div>

      {/* Windows 11 taskbar */}
      <div className="flex h-12 items-center justify-between border-t border-white/10 bg-black/50 px-6 backdrop-blur-md">
        {/* Left spacer */}
        <div className="w-24" />

        {/* Center: start + open app */}
        <div className="flex items-center gap-1">
          {/* Start button */}
          <button
            aria-label="Start"
            className="flex h-10 w-10 items-center justify-center rounded transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 22 22" className="h-5 w-5" fill="white" opacity="0.75">
              <rect x="0" y="0" width="10" height="10" rx="1" />
              <rect x="12" y="0" width="10" height="10" rx="1" />
              <rect x="0" y="12" width="10" height="10" rx="1" />
              <rect x="12" y="12" width="10" height="10" rx="1" />
            </svg>
          </button>

          {/* Active PhishQuest window */}
          <button className="flex h-10 items-center gap-2 rounded border-b-2 border-white/70 bg-white/10 px-3 transition-colors hover:bg-white/15">
            <Image src="/usc-logo.png" alt="" width={16} height={16} className="opacity-90" />
            <span className="hidden text-xs text-white/70 sm:block">PhishQuest</span>
          </button>
        </div>

        {/* Right: clock */}
        <div className="flex w-24 flex-col items-end">
          {clockStr && (
            <>
              <span className="text-xs font-medium leading-none text-white/70">{clockStr}</span>
              <span className="mt-0.5 text-[10px] leading-none text-white/45">
                {new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </>
          )}
        </div>
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
