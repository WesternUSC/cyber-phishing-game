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
import Slideshow from '@/components/slideshow';
import { slides } from '@/components/slides';

const emails = emailData.emails as Email[];
const STORAGE_KEY = 'phishquest-run';

const desktopApps = [
  {
    id: "recycle",
    name: "Recycle Bin",
    icon: "/recycle-bin.png",
    description: "Displays deleted files that can be restored or permanently removed."
  },
  {
    id: "explorer",
    name: "File Explorer",
    icon: "/folder.webp",
    description: "Browse and organize files and folders."
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    icon: "/edge.png",
    description: "Microsoft's web browser."
  },
  {
    id: "chrome",
    name: "Google Chrome",
    icon: "/chrome_icon.webp",
    description: "Browse the web with Google Chrome.",
    action: "openChrome"
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: "/outlook.webp",
    description: "Read and send email."
  },
  {
    id: "settings",
    name: "Settings",
    icon: "/settings.webp",
    description: "Configure Windows settings."
  },
  {
    id: "photos",
    name: "Photos",
    icon: "/photos-icon.png",
    description: "View and organize pictures."
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: "/calculator.webp",
    description: "Perform calculations."
  },
  {
    id: "paint",
    name: "Paint",
    icon: "/paint.png",
    description: "Basic drawing and image editing."
  },
  {
    id: "notepad",
    name: "Notepad",
    icon: "/notepad.png",
    description: "Simple text editor."
  },
  {
    id: "store",
    name: "Microsoft Store",
    icon: "/store.png",
    description: "Install apps and games."
  },
];

const bookmarks = [
  { name: "Gmail", icon: "/gmail_icon.webp" },
  { name: "YouTube", icon: "/Youtube_logo.png" },
  { name: "Drive", icon: "/drive_logo.webp" },
  { name: "Docs", icon: "/docs_logo.webp" },
  { name: "Calendar", icon: "/google_calendar.webp" },
  { name: "GitHub", icon: "/github_logo.webp" },
];


// ── Tablet detection hook ─────────────────────────────────────────────────────
// Matches any touch-based device >= 768px wide (iPad, Android tablet, etc.)
// Returns false on SSR and flips to true on the client when applicable.
function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    // min-width: 700px  → excludes phones in portrait (≤ ~430px wide)
    // min-height: 500px → excludes phones in landscape (≤ ~430px tall)
    //                     iPad Mini landscape with browser chrome ≈ 640–660px, safely above 500px
    const mq = window.matchMedia('(pointer: coarse) and (min-width: 700px) and (min-height: 500px)');
    setIsTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isTablet;
}

export default function HomePage() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [nameInput, setNameInput] = useState('');
  const [introSeen, setIntroSeen] = useState(false);
  const [slidesSeen, setSlidesSeen] = useState(false);
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
  const isTablet = useIsTablet();

  const [isMinimized, setIsMinimized] = useState(true);
  const [showStart, setShowStart] = useState(false);

  const [openApp, setOpenApp] = useState<
  | {
      name: string;
      description: string;
    }
  | null
>(null);

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

  function resetGame() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  // Reset when pressing "R" key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore typing in text boxes
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key.toLowerCase() === 'r') {
        resetGame();
      }

      if (event.key.toLowerCase() === 's') {
        setSlidesSeen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    var correct = currentEmail.truth === decision;
    if (currentEmail.explanation.includes("This email could be a phishing attempt")) {
      correct = true;
    }
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
  const introContent = (
      <div className="flex h-full items-center justify-center bg-[#f6f8fc] p-4">
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

  // ── Name entry screen ───────────────────────────────────────────────────────
  const nameContent = (
      <div className="flex h-full items-center justify-center bg-[#f6f8fc] p-4">
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

  // ── Shared inner game layout ─────────────────────────────────────────────────
  // Used by both the iPad and the desktop (Windows) wrappers below.
  const innerGame = (
    <>
      <AppShell playerName={state.playerName} score={score} total={state.reviewed.length} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — vertical progress */}
        <aside className="hidden h-full w-40 shrink-0 flex-col border-r border-gray-200 bg-white p-4 lg:flex">
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
              <div className="relative mt-1 h-82 w-6 shrink-0 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-full bg-[#1a73e8] transition-all duration-500"
                  style={{ height: `${progressPct * 100}%` }}
                />
              </div>
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
              <span className="text-sm font-normal text-gray-500">/{state.reviewed.length}</span>
            </p>
          </div>

          {/* Reset */}
          <button
  onClick={resetGame}
  className="mt-auto w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
>
  Reset
</button>

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
            isTablet={isTablet}
          />
        </main>
      </div>
    </>
  );

  if (!slidesSeen) {
    return <Slideshow slides={slides} onLastSlide={() => setSlidesSeen(true)} />;
  }

  // ── iPad / tablet layout ─────────────────────────────────────────────────────
  // Clean, no Windows chrome. Locked to landscape via an overlay prompt.
  if (isTablet) {
    return (
      <div className="relative flex h-screen flex-col overflow-hidden bg-[#f6f8fc]">
        {/* Portrait overlay — hidden in landscape, visible in portrait */}
        <div className="landscape:hidden absolute inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white px-12 text-center">
          <Image src="/usc-logo.png" alt="USC Logo" width={72} height={72} />

          {/* Portrait → landscape graphic */}
          <div className="flex items-center gap-5 text-[#4f2584]">
            {/* Portrait tablet */}
            <svg viewBox="0 0 24 36" className="h-16 w-11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="32" rx="3" />
            </svg>
            {/* Arrow */}
            <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
            {/* Landscape tablet */}
            <svg viewBox="0 0 36 24" className="h-11 w-16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="32" height="20" rx="3" />
            </svg>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-900">Rotate your device</p>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              PhishQuest is designed for landscape orientation
            </p>
          </div>
        </div>

        {innerGame}

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

  let windowContent;

  if (!introSeen) {
    windowContent = introContent;
  } else if (!state.started) {
    windowContent = nameContent;
  } else {
    windowContent = innerGame;
  }

  // ── Desktop layout (Windows 11 theme) ────────────────────────────────────────
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/Windows-11-default-wallpaper.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",
        backgroundSize: "100% 100%"
      }}
    >
      {/* Desktop area — sits above the taskbar */}
      <div className="flex h-[calc(100vh-3rem)] items-center justify-center p-5">

        <div className="absolute left-6 top-6 grid auto-rows-max grid-flow-col grid-rows-6 gap-x-6 gap-y-4">
  {desktopApps.map((app) => (
    <button
      key={app.id}
      onDoubleClick={() => {
      if (app.action === "openChrome") {
        setIsMinimized(false);
        return;
      }

      setOpenApp({
        name: app.name,
        description: app.description,
      });
    }}
      className="flex w-20 flex-col items-center rounded-lg p-2 text-white hover:bg-white/10"
    >
      <Image
        src={app.icon}
        alt={app.name}
        width={48}
        height={48}
      />

      <span className="mt-2 text-center text-xs drop-shadow-lg">
        {app.name}
      </span>
    </button>
  ))}

      </div>

        {/* Floating app window */}
        {!isMinimized && (
        <div
            className="
              flex
              w-[80vw] max-w-[1600px]
              h-[calc(100vh-5rem)]
              max-h-[1000px]
              flex-col
              overflow-hidden
              rounded-lg
              shadow-[0_20px_60px_rgba(0,0,0,0.65)]
              z-20
            "
          >

          {/* Chrome frame */}
          <div className="select-none bg-[#202124]">
            {/* Tabs */}
          <div className="flex h-10 items-end gap-1 px-2 pt-1 bg-[#202124]">

            {/* Active tab */}
            <div className="flex h-8 w-48 items-center gap-2 rounded-t-xl bg-[#2d2f31] px-4">
              <Image
                src="/usc-logo.png"
                alt=""
                width={16}
                height={16}
              />

              <span className="flex-1 truncate text-[13px] text-white">
                PhishQuest
              </span>

              <button className="rounded p-1 text-[10px] text-white/60 hover:bg-white/10">
                ✕
              </button>
            </div>

            {/* Inactive tabs */}

            <div className="relative flex h-8 w-48 items-center gap-2 rounded-t-lg px-3 text-white/70 hover:bg-white/10">
              <Image
                src="/outlook.webp"
                alt=""
                width={16}
                height={16}
              />
              <span className="flex-1 truncate text-[12px]">
                Outlook
              </span>

              <button className="rounded p-1 text-[10px] text-white/60 hover:bg-white/10">
                ✕
              </button>

              <div className="absolute right-0 top-2 bottom-2 w-px bg-white/15" />
            </div>

            <div className="relative flex h-8 w-44 items-center gap-2 rounded-t-lg px-3 text-white/70 hover:bg-white/10">
              <Image
                src="/Youtube_logo.png"
                alt=""
                width={16}
                height={16}
              />
              <span className="flex-1 truncate text-[12px]">
                YouTube
              </span>

              <button className="rounded p-1 text-[10px] text-white/60 hover:bg-white/10">
                ✕
              </button>

              <div className="absolute right-0 top-2 bottom-2 w-px bg-white/15" />
            </div>

            <div className="flex h-8 w-44 items-center gap-2 rounded-t-lg px-3 text-white/70 hover:bg-white/10">
              <Image
                src="/google_calendar.webp"
                alt=""
                width={16}
                height={16}
              />
              <span className="flex-1 truncate text-[12px]">
                Google Calendar
              </span>

              <button className="rounded p-1 text-[10px] text-white/60 hover:bg-white/10">
                ✕
              </button>

              <div className="absolute right-0 top-2 bottom-2 w-px bg-white/15" />
            </div>

            {/* New tab */}
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10">
              +
            </button>

            <div className="ml-auto flex">
              <button onClick={() => setIsMinimized(true)} className="flex h-10 w-12 items-center justify-center text-white/60 hover:bg-white/10">
                <svg width="10" height="1" fill="currentColor">
                  <rect width="10" height="1" />
                </svg>
              </button>

              <button className="flex h-10 w-12 items-center justify-center text-white/60 hover:bg-white/10">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x=".6" y=".6" width="8.8" height="8.8" />
                </svg>
              </button>

              <button className="flex h-10 w-12 items-center justify-center text-white/60 hover:bg-red-600 hover:text-white">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <line x1="1" y1="1" x2="9" y2="9" />
                  <line x1="9" y1="1" x2="1" y2="9" />
                </svg>
              </button>
            </div>
          </div>


            {/* Toolbar */}
            <div className="flex h-12 items-center gap-3 border-t border-white/5 bg-[#2d2f31] px-3">
              {/* Navigation */}
              <button className="text-lg text-white/70">←</button>
              <button className="text-lg text-white/40">→</button>
              <button className="text-lg text-white/70">⟳</button>

              {/* Omnibox */}
              <div className="flex h-9 flex-1 items-center rounded-full bg-[#202124] px-4">
                <span className="mr-2 text-sm text-white/60">🔒</span>

                <span className="truncate text-sm text-white/75">
                  training.usc/phishquest
                </span>
              </div>

              {/* Extensions */}
              <button className="text-white/60">☆</button>
              <button className="text-white/60">🧩</button>

              {/* Profile */}
              <div className="h-8 w-8 overflow-hidden rounded-full bg-[#ffffff]">
                <Image
                  src="/usc-logo.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bookmarks bar */}
          <div className="flex h-9 items-center gap-1 border-t border-white/5 bg-[#2d2f31] px-3">
          {bookmarks.map((bookmark) => (
            <button
              key={bookmark.name}
              className="flex items-center gap-2 rounded px-3 py-1 text-[13px] text-white/80 hover:bg-white/10"
            >
              <Image
                src={bookmark.icon}
                alt=""
                width={16}
                height={16}
              />

              <span>{bookmark.name}</span>
            </button>
          ))}
        </div>

          {windowContent}
        </div>
        )}
      </div>

      {showStart && (
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowStart(false)}
      >
        <div
          className="absolute bottom-14 left-1/2 w-[620px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#202020]/90 shadow-2xl backdrop-blur-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search */}
          <div className="p-6 pb-4">
            <div className="flex items-center rounded-full bg-white/8 px-4 py-3 text-sm text-white/60">
              🔍
              <span className="ml-3">Search for apps, settings, and documents</span>
            </div>
          </div>

          {/* Pinned */}
          <div className="px-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Pinned</h2>
              <button className="rounded bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10">
                All apps →
              </button>
            </div>

            <div className="grid grid-cols-6 gap-5">
              {[
                { icon: "/chrome_icon.webp", label: "Chrome" },
                { icon: "/photos-icon.png", label: "Photos" },
                { icon: "/folder.webp", label: "Files" },
                { icon: "/settings.webp", label: "Settings" },
                { icon: "/outlook.webp", label: "Outlook" },
                { icon: "/edge.png", label: "Edge" },
              ].map((app) => (
                <button
                  key={app.label}
                  className="flex flex-col items-center rounded-xl p-2 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    <Image
                      src={app.icon}
                      alt={app.label}
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>

                  <span className="mt-2 h-4 text-center text-xs leading-4 text-white/80">
                    {app.label}
                  </span>

                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="mt-8 px-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Recommended</h2>
              <button className="text-xs text-white/60">More →</button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-white/10">
                <Image
                  src="/chrome_icon.webp"
                  alt=""
                  width={28}
                  height={28}
                />
                <div>
                  <p className="text-sm text-white">Chrome</p>
                  <p className="text-xs text-white/45">
                    Recently used
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom account bar */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 bg-black/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4f2584] font-semibold text-white">
                {state.playerName.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm text-white">
                  {state.playerName}
                </p>
                <p className="text-xs text-white/50">
                  Local Account
                </p>
              </div>
            </div>

            <button className="rounded-lg p-2 hover:bg-white/10">
              ⏻
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Windows 11 taskbar */}
      <div className="flex h-12 items-center justify-between border-t border-white/10 bg-black/50 px-6 backdrop-blur-md">
        <div className="w-24" />
        <div className="flex items-center gap-1">
          <button aria-label="Start" onClick={() => setShowStart((prev) => !prev)} className="flex h-10 w-10 items-center justify-center rounded transition-colors hover:bg-white/10">
            <svg viewBox="0 0 22 22" className="h-5 w-5" fill="white" opacity="0.75">
              <rect x="0" y="0" width="10" height="10" rx="1" />
              <rect x="12" y="0" width="10" height="10" rx="1" />
              <rect x="0" y="12" width="10" height="10" rx="1" />
              <rect x="12" y="12" width="10" height="10" rx="1" />
            </svg>
          </button>
          <button onClick={() => setIsMinimized((prev) => !prev)} className="flex h-10 items-center gap-2 rounded border-b-2 border-white/70 bg-white/10 px-3 transition-colors hover:bg-white/15">
            <Image src="/chrome_icon.webp" alt="" width={24} height={24} className="opacity-90" />
            {/* <span className="hidden text-xs text-white/70 sm:block">Chrome</span> */}
          </button>
        </div>
        <div className="flex w-24 flex-col items-end">
          {clockStr && (
            <>
              <span className="text-xs font-medium leading-none text-white/70">{clockStr}</span>
              <span className="mt-0.5 text-[10px] leading-none text-white/45">
                {(() => {
                  const date = new Date();
                  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                })()}
              </span>
            </>
          )}
        </div>
      </div>

      {openApp && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        onClick={() => setOpenApp(null)}
      >
        <div
          className="w-[420px] overflow-hidden rounded-lg bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between bg-[#202020] px-4 py-2 text-white">
            <span className="text-sm">{openApp.name}</span>

            <button
              onClick={() => setOpenApp(null)}
              className="rounded px-2 hover:bg-red-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">
              {openApp.name}
            </h2>

            <p className="text-sm text-gray-600">
              {openApp.description}
            </p>

            <p className="text-sm text-gray-600">
              Please continue with Chrome.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setOpenApp(null)}
                className="rounded bg-[#4f2584] px-4 py-2 text-sm text-white hover:bg-[#3d1d68]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

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
