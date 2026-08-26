'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
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
import ModuleCompletion from '@/components/module-completion';
import { Trophy } from 'lucide-react';
import { saveResult } from '@/lib/saveResult';
import SlackApp from '@/components/slack-app';

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
  {
    id: "slack",
    name: "Slack",
    icon: "/slack_logo_icon.webp",
    description: "Team communication and collaboration.",
    action: "openSlack"
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

type User = {
  name: string;
  email: string;
  loginCode: string;
};

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

function ResultsScreen({
  playerName,
  score,
  total,
}: {
  playerName: string;
  score: number;
  total: number;
}) {
  const [saveStatus, setSaveStatus] = useState<
    'pending' | 'saved' | 'error'
  >('pending');

  const savedRef = useRef(false);

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const grade =
    pct === 100
      ? 'Perfect score!'
      : pct >= 80
        ? 'Great job!'
        : pct >= 60
          ? 'Getting there!'
          : 'Keep practicing!';

  const gradeColor =
    pct === 100
      ? 'text-green-600'
      : pct >= 80
        ? 'text-[#1a73e8]'
        : pct >= 60
          ? 'text-yellow-600'
          : 'text-red-600';

  useEffect(() => {
    if (savedRef.current) return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const state = JSON.parse(raw);

      savedRef.current = true;

      saveResult(state, emails)
        .then(() => setSaveStatus('saved'))
        .catch((err) => {
          console.error(err);
          setSaveStatus('error');
        });
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#f6f8fc]">
      {/* PhishQuest header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/usc-logo.png"
            alt="USC Logo"
            width={36}
            height={36}
          />

          <span className="text-xl font-normal text-gray-700">
            Phish
            <span className="font-semibold text-[#4f2584]">
              Quest
            </span>
          </span>
        </div>

        <span
          className={`text-xs ${
            saveStatus === 'saved'
              ? 'text-green-600'
              : saveStatus === 'error'
                ? 'text-red-500'
                : 'text-gray-400'
          }`}
        >
          {saveStatus === 'saved'
            ? '✓ Results saved'
            : saveStatus === 'error'
              ? '⚠ Could not save'
              : 'Saving…'}
        </span>
      </div>

      {/* Results */}
      <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
        <div className="w-full max-w-2xl">
          {/* Score card */}
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f0fe]">
                <Trophy className="h-10 w-10 text-[#4f2584]" />
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900">
              {score}/{total}
            </h1>

            <p className={`mt-1 text-lg font-medium ${gradeColor}`}>
              {grade}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {playerName} &bull; {pct}% accuracy
            </p>

            {/* Progress bar */}
            <div className="mx-auto mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${
                  pct >= 80
                    ? 'bg-green-500'
                    : pct >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <br></br>
            <p className={`mt-1 text-lg font-medium`}>
              Please continue to the next module.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [nameInput, setNameInput] = useState('');
  const [introSeen, setIntroSeen] = useState(false);
  const [slidesSeen, setSlidesSeen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [clockStr, setClockStr] = useState('');
  const [feedback, setFeedback] = useState<{
    open: boolean;
    correct: boolean;
    explanation: string;
    evidence: string[];
  }>({ open: false, correct: false, explanation: '', evidence: [] });
  const openedAtRef = useRef<number>(Date.now());
  const isTablet = useIsTablet();

  const [isChromeClosed, setisChromeClosed] = useState(true);
  const [isSlackClosed, setisSlackClosed] = useState(true);

  const [showStart, setShowStart] = useState(false);

  const [activeTab, setActiveTab] = useState<'phishquest' | 'outlook' | 'western' | 'calendar' | 'trello' | 'rippling' | 'modules'>(
    'phishquest'
  );

  const [showWesternPopup, setShowWesternPopup] = useState(false);

  const [westernPage, setWesternPage] = useState<'home' | 'report'>('home');
  const [westernPopup, setWesternPopup] = useState<string | null>(null);

  const [nameEntered, setNameEntered] = useState(false);

  const [moduleStarted, setModuleStarted] = useState<Record<string, boolean>>({});

  const [requester, setRequester] = useState("");
  const [issueRelatedTo, setIssueRelatedTo] = useState("");
  const [subject, setSubject] = useState("");

  const [completedDrive, setCompletedDrive] = useState(false);
  const [completedTicketing, setCompletedTicketing] = useState(false);
  const [completedCalendar, setCompletedCalendar] = useState(false);
  const [completedTrello, setCompletedTrello] = useState(false);
  const [completedRippling, setCompletedRippling] = useState(false);
  const [completedSlack, setCompletedSlack] = useState(false);

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

      // if (event.key.toLowerCase() === 's') {
      //   setSlidesSeen(true);
      // }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetch('login_info.csv')
      .then((response) => response.text())
      .then((csv) => {
        const rows = csv
          .trim()
          .split('\n')
          .map((row) => row.split(','));

        const parsedUsers = rows.map(([name, email, loginCode]) => ({
          name: name.trim().replace(/[,"]/g, ''),
          email: email.trim(),
          loginCode: loginCode.trim(),
        }));

        
        console.log('===== PARSED USERS =====');
        console.table(parsedUsers);
        console.log('==========================');
        

        setUsers(parsedUsers);
      })
      .catch((error) => {
        console.error('Could not load CSV:', error);
      });
  }, []);

  /*
  const currentEmail = emails.find((e) => e.id === state.currentEmailId);
  const score = Object.values(state.decisions).filter((d) => d.correct).length;
  const progressPct = emails.length > 0 ? state.reviewed.length / emails.length : 0;
  */
  const currentEmail = emails.find((e) => e.id === state.currentEmailId);

  const score = Object.values(state.decisions).filter(
    (d) => d.correct
  ).length;

  const progressPct =
    emails.length > 0
      ? state.reviewed.length / emails.length
      : 0;

  const gameComplete =
    state.started && state.reviewed.length === emails.length;


  function start() {
    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError(true);
      return;
    }

    const player = users.find(
      (player) => player.loginCode === trimmed
    );

    if (!player) {
      setNameError(true);
      return;
    }

    setNameInput(player.name);

    setNameError(false);
    setNameEntered(true);
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

  function startModule(moduleId: string) {
    setModuleStarted((prev) => ({
      ...prev,
      [moduleId]: true,
    }))

    switch (moduleId) {
      case "outlook":
        setCompletedDrive(true);
        break;

      case "calendar":
        setCompletedCalendar(true);
        break;

      case "trello":
        setCompletedTrello(true);
        break;

      case "rippling":
        setCompletedRippling(true);
        break;
    }
  }

  function ModuleIntro({
    moduleId,
    title,
    description,
    icon,
  }: {
    moduleId: string;
    title: string;
    description: string;
    icon: string;
  }) {
    const started = moduleStarted[moduleId];

    if (started) return null;

    return (
      <div className="flex flex-1 items-center justify-center bg-[#f6f8fc] p-8">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f7f3fb]">
            <Image
              src={icon}
              alt=""
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-[#4f2584]">
            Training Module
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-gray-900">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600">
            {description}
          </p>

          <div className="mt-6 rounded-xl bg-[#f7f3fb] px-5 py-4 text-left">
            <p className="text-sm font-medium text-[#4f2584]">
              What you'll do
            </p>

            <p className="mt-1 text-sm leading-5 text-gray-600">
              Follow the interactive guide carefully and pay attention to the
              steps shown. When you're ready, click Continue to begin the module.
            </p>
          </div>

          <button
            onClick={() => startModule(moduleId)}
            
            className="mt-7 rounded-xl bg-[#4f2584] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d1d68] hover:shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    );
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
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#f6f8fc] via-white to-[#eee8f7] px-4 py-4 sm:px-6 sm:py-6">
        <div className="w-full max-w-lg max-h-full">

          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
              <Image
                src="/usc-logo.png"
                alt="USC Logo"
                width={52}
                height={52}
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Welcome to PhishQuest
            </h1>

            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[#4f2584]">
              USC Information Security Training
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-gray-200 sm:p-7">
            <div className="space-y-2.5 text-sm leading-5 text-gray-600">
              <p>
                Welcome to <strong className="text-gray-900">PhishQuest</strong>, an
                interactive cybersecurity awareness training program designed to
                help you recognize phishing attempts and other common online
                security threats.
              </p>

              <p>
                During the training, you will be presented with{' '}
                <strong className="text-gray-900">7 modules</strong> covering
                different cybersecurity scenarios. Each module will give you the
                opportunity to practice identifying suspicious messages, websites,
                requests, and other potential security risks.
              </p>

              <p>
                You should have receieved a login code via email. Please enter this
                code below to access the training.
              </p>

              <div className="rounded-xl border border-[#4f2584]/15 bg-[#f7f3fb] p-4">
                <p className="font-medium text-[#4f2584]">
                  🎓 Complete all 7 modules
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Once you successfully complete the training, you will receive a
                  certificate that you can download and keep as proof of completion.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="player-name"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Your login code
              </label>

              <input
                id="player-name"
                type="text"
                inputMode="numeric"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && start()}
                placeholder="Enter your login code"
                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-4 ${
                  nameError
                    ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10'
                    : 'border-gray-300 bg-white focus:border-[#4f2584] focus:ring-[#4f2584]/10'
                }`}
                autoFocus
              />

              {nameError && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                  <span>⚠</span>
                  Invalid login code.
                </p>
              )}
            </div>

            <button
              onClick={start}
              className="mt-3 w-full rounded-xl bg-[#4f2584] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d1d68] hover:shadow-md active:scale-[0.99]"
            >
              Begin Training
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Your name will be used to personalize your training experience and
              certificate.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            PhishQuest &bull; USC Information Security Training
          </p>
        </div>
      </div>
    );

  // ── Shared inner game layout ─────────────────────────────────────────────────
  // Used by both the iPad and the desktop (Windows) wrappers below.
  const innerGame = gameComplete ? (
    <ResultsScreen
      playerName={state.playerName}
      score={score}
      total={emails.length}
    />
  ) : (
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

  if (!nameEntered) {
    return nameContent;
  }

  if (!slidesSeen) {
    return (
      <Slideshow
        slides={slides(nameInput.trim())}
        onLastSlide={() => {
          setSlidesSeen(true);

          const runId = crypto.randomUUID();

          dispatch({
            type: 'START',
            name: nameInput.trim(),
            firstEmailId: emails[0].id,
            runId,
          });

          openedAtRef.current = Date.now();
        }}
      />
    );
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

  const windowContent = innerGame;

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
        setisChromeClosed(false);
        return;
      }

      if (app.action === "openSlack") {
        setisSlackClosed(false);
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
        {!isChromeClosed && (
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

              {/* PhishQuest tab */}
              <button
                onClick={() => setActiveTab('phishquest')}
                className={`relative flex h-8 w-48 items-center gap-2 rounded-t-xl px-4 ${
                  activeTab === 'phishquest'
                    ? 'bg-[#2d2f31]'
                    : 'bg-transparent hover:bg-white/10'
                }`}
              >
                <Image
                  src="/usc-logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "phishquest" ? "text-white" : "text-white/70"
                  }`}
                >
                  PhishQuest
                </span>

                <span className="ml-auto shrink-0 rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                {/* Tab divider */}
                <div className="absolute right-0 top-2 bottom-2 z-10 w-px bg-white/25" />
              </button>


              {/* Google Drive tab */}
              <button
                onClick={() => setActiveTab('outlook')}
                className={`relative flex h-8 w-48 items-center rounded-t-lg px-3 ${
                  activeTab === 'outlook'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/drive_logo.webp"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "outlook" ? "text-white" : "text-white/70"
                  }`}
                >
                  Google Drive
                </span>

                <span className="ml-auto shrink-0 rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                {/* Divider */}
                <div className="absolute right-0 top-2 bottom-2 z-10 w-px bg-white/15" />
              </button>

              {/* Western University support tab */}
              <button
                onClick={() => setActiveTab('western')}
                className={`relative flex h-8 w-44 items-center gap-2 rounded-t-lg px-3 ${
                  activeTab === 'western'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/usc-logo.png"
                  alt=""
                  width={16}
                  height={16}
                  style={{ backgroundColor: "white" }}
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "western" ? "text-white" : "text-white/70"
                  }`}
                >
                  Support: Western University
                </span>

                <span className="rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                <div className="absolute right-0 top-2 bottom-2 w-px bg-white/15" />
              </button>


              {/* Google Calendar tab */}
              <button
                onClick={() => setActiveTab('calendar')}
                className={`relative flex h-8 w-44 items-center gap-2 rounded-t-lg px-3 ${
                  activeTab === 'calendar'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/google_calendar.webp"
                  alt=""
                  width={16}
                  height={16}
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "calendar" ? "text-white" : "text-white/70"
                  }`}
                >
                  Google Calendar
                </span>

                <span className="rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                <div className="absolute right-0 top-2 bottom-2 w-px bg-white/15" />
              </button>

              {/* Trello tab */}
              <button
                onClick={() => setActiveTab('trello')}
                className={`relative flex h-8 w-48 items-center rounded-t-lg px-3 ${
                  activeTab === 'trello'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/trello-logo-icon.webp"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "trello" ? "text-white" : "text-white/70"
                  }`}
                >
                  Trello
                </span>

                <span className="ml-auto shrink-0 rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                <div className="absolute right-0 top-2 bottom-2 z-10 w-px bg-white/15" />
              </button>

              {/* Rippling tab */}
              <button
                onClick={() => setActiveTab('rippling')}
                className={`relative flex h-8 w-48 items-center rounded-t-lg px-3 ${
                  activeTab === 'rippling'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/rippling-logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "rippling" ? "text-white" : "text-white/70"
                  }`}
                >
                  Rippling
                </span>

                <span className="ml-auto shrink-0 rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                <div className="absolute right-0 top-2 bottom-2 z-10 w-px bg-white/15" />
              </button>

              {/* Modules tab */}
              <button
                onClick={() => setActiveTab('modules')}
                className={`relative flex h-8 w-48 items-center rounded-t-lg px-3 ${
                  activeTab === 'modules'
                    ? 'bg-[#2d2f31]'
                    : 'hover:bg-white/10'
                }`}
              >
                <Image
                  src="/usc-logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0 bg-white"
                />

                <span
                  className={`ml-2 truncate text-[13px] ${
                    activeTab === "modules" ? "text-white" : "text-white/70"
                  }`}
                >
                  Modules
                </span>

                <span className="ml-auto shrink-0 rounded p-1 text-[10px] text-white/60">
                  ✕
                </span>

                <div className="absolute right-0 top-2 bottom-2 z-10 w-px bg-white/15" />
              </button>


              {/* New tab */}
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10">
                +
              </button>

              {/* Window controls */}
              <div className="ml-auto flex">
                <button
                  onClick={() => setisChromeClosed(true)}
                  className="flex h-10 w-12 items-center justify-center text-white/60 hover:bg-white/10"
                >
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
                  {activeTab === 'phishquest' && 'training.usc/phishquest'}
                  {activeTab === 'outlook' && 'drive.google.com/training'}
                  {activeTab === 'western' &&
                    (westernPage === 'report'
                      ? 'westernusc.freshservice.com/support/tickets/new'
                      : 'westernusc.freshservice.com/support/home')}
                  {activeTab === 'calendar' && 'calendar.google.com'}
                  {activeTab === 'trello' && 'trello.com/training'}
                  {activeTab === 'rippling' && 'app.rippling.com/training'}
                  {activeTab === 'modules' && 'training.usc/modules'}
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

          {activeTab === 'phishquest' && windowContent}

          {activeTab === 'outlook' && (
            moduleStarted.outlook ? (
              <div className="flex flex-1 min-h-0 bg-white">
                <iframe
                  src="https://scribehow.com/embed-preview/Google_Drive_HowTo_Guide__fX1wnsttR_WURhS2_AOeCA?as=slides&size=flexible"
                  title="Google Drive Training Guide"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <ModuleIntro
                moduleId="outlook"
                title="Google Drive"
                description="Learn how to use Google Drive to organize, manage, and work with your files. This interactive guide will walk you through the key steps you need to know."
                icon="/drive_logo.webp"
              />
            )
          )}

          {activeTab === 'western' && (
            moduleStarted.western ? (
            <div className="relative flex flex-1 flex-col overflow-hidden">
              {westernPage === 'home' ? (
                <div className="flex flex-1 flex-col overflow-y-auto bg-[#ebeff3]">

                  <div className="shrink-0 bg-[#4f2683] px-8 pb-10 pt-5 text-white">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
                          aria-label="Menu"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                          </svg>
                        </button>

                        <span className="text-lg font-bold">
                          Western University Students' Council
                        </span>
                      </div>

                      <div className="flex items-center gap-4">

                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
                          aria-label="Notifications"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                            <path d="M10 21h4" />
                          </svg>
                        </button>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eceff1] text-sm font-semibold text-gray-700">
                          {state.playerName.charAt(0).toUpperCase()}
                        </div>

                      </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center">

                      <h1 className="text-center text-2xl">
                        Welcome to the Information Systems portal.
                      </h1>

                      <div className="relative mt-6 w-full">

                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <circle cx="11" cy="11" r="7" />
                            <line x1="16" y1="16" x2="21" y2="21" />
                          </svg>
                        </div>

                        <input
                          type="text"
                          placeholder="Search for solutions, services, and tickets."
                          className="h-12 w-full rounded-md border-0 bg-white pl-12 pr-4 text-sm text-gray-800 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
                        />

                      </div>
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-6xl px-8 py-8 text-center">

                    <p className="text-sm text-gray-700">
                      To immediately reach us please send an email to{' '}
                      <span className="font-medium">
                        helpdesk@westernusc.ca
                      </span>{' '}
                      or click <strong>Report an issue</strong>.
                    </p>

                    <p className="mt-3 text-sm text-gray-700">
                      Otherwise please sign up on the top right corner to access all
                      service options.
                    </p>

                    <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                      {[
                        {
                          id: 'report',
                          title: 'Report an issue',
                          text: 'Having trouble? Contact IT support',
                          imageUrl:
                            'https://assets17.freshservice.com/a/assets/images/portal-designer/card-images/incident-882ab892261d8226f52c966bdb4b1a4c.svg',
                        },
                        {
                          id: 'articles',
                          title: 'Browse help articles',
                          text: 'Look up how-to guides or read FAQs to fix issues on your own',
                          imageUrl:
                            'https://assets17.freshservice.com/a/assets/images/portal-designer/card-images/solutions-a3cd12ce8098d2bf565a131f6ef34d0b.svg',
                        },
                        {
                          id: 'service',
                          title: 'Request an IT service',
                          text: 'Browse the list of services offered',
                          imageUrl:
                            'https://assets17.freshservice.com/a/assets/images/portal-designer/card-images/service_catalog-d10875536e2ae1b9e76b7129299cbe59.svg',
                        },
                        {
                          id: 'meeting',
                          title: 'Request a meeting',
                          text: 'Request an in-person or zoom meeting with Information Systems',
                          imageUrl: '/freshservice-icons/zoom.png',
                        },
                      ].map((card) => (
                        <button
                          key={card.title}
                          onClick={() => {
                            if (card.id === 'report') {
                              setWesternPage('report');
                            } else {
                              setWesternPopup(
                                'Please click "Report an issue".'
                              );
                            }
                          }}
                          className="flex h-28 min-w-0 items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
                            <img
                              src={card.imageUrl}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {card.title}
                            </h3>

                            <p className="mt-1 text-xs leading-4 text-gray-500">
                              {card.text}
                            </p>
                          </div>
                        </button>
                      ))}

                    </div>

                    <div className="mt-9">

                      <p className="text-sm text-gray-700">
                        Please sign up using your UWO email to use the following
                        services.
                      </p>

                      <button
                        onClick={() =>
                          setWesternPopup(
                            'Please click "Report an issue".'
                          )
                        }
                        className="mt-4 rounded-md border border-gray-300 bg-white px-7 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-gray-50"
                      >
                        Sign Up
                      </button>

                    </div>

                    <p className="mx-auto mt-8 max-w-3xl text-sm text-gray-700">
                      Square reader, USC storefront and Bounce page requests requires
                      2 business days notice and approval on Western link.
                    </p>

                    <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                      {[
                        {
                          title: 'Square Reader',
                          text: 'Square credit card reader and a device to process payments at your event.',
                          imageUrl: '/freshservice-icons/square.jpg',
                        },
                        {
                          title: 'USC Storefront',
                          text: 'Sell items online, receive donations & event ticketing with no scanning.',
                          imageUrl: '/freshservice-icons/usc.png',
                        },
                        {
                          title: 'Bounce Page',
                          text: 'Event ticketing with door scanning, SMS, photo sharing, and notifications.',
                          imageUrl: '/freshservice-icons/bounce.jpg',
                        },
                        {
                          title: 'Request a Refund',
                          text: 'Request a club membership or a refund for tickets from the USC Storefront.',
                          imageUrl: '/freshservice-icons/usc.png',
                        },
                      ].map((card) => (
                        <button
                          key={card.title}
                          onClick={() =>
                            setWesternPopup(
                              'Please click "Report an issue".'
                            )
                          }
                          className="flex h-36 min-w-0 items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
                            <img
                              src={card.imageUrl}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {card.title}
                            </h3>

                            <p className="mt-1 text-xs leading-4 text-gray-500">
                              {card.text}
                            </p>
                          </div>
                        </button>
                      ))}

                    </div>

                  </div>

                  <div className="mt-auto h-12 shrink-0 bg-[#4f2683]" />

                </div>


              ) : (

                <div className="flex flex-1 flex-col overflow-hidden bg-[#ebeff3]">

                  <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">

                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        Western University Students' Council
                      </span>
                    </div>

                    <div className="flex items-center gap-4">

                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
                        aria-label="Notifications"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                          <path d="M10 21h4" />
                        </svg>
                      </button>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eceff1] text-sm font-semibold text-gray-700">
                        {state.playerName.charAt(0).toUpperCase()}
                      </div>

                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 overflow-hidden">

                    <div className="flex min-h-0 flex-1 justify-center px-8 py-5">

                      <div className="flex min-h-0 w-full max-w-5xl items-stretch gap-6">

                        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-md bg-white shadow-sm">

                          <div className="flex-1 p-6">

                            <div className="mb-4 text-sm text-gray-500">

                              <button
                                onClick={() => setWesternPage('home')}
                                className="text-[#172b4d] hover:underline"
                              >
                                Home
                              </button>

                              <span className="mx-2">›</span>

                              <span>Report an Issue</span>

                            </div>

                            <h1 className="text-2xl font-semibold text-gray-900">
                              Report an Issue
                            </h1>

                            <div className="mt-4 h-px w-full bg-gray-200" />

                            <div className="mt-5">

                              <label className="text-xs font-bold text-gray-700">
                                Requester
                                <span className="ml-1 text-red-500">*</span>
                              </label>

                              <input
                                type="text"
                                value={requester}
                                onChange={(e) => setRequester(e.target.value)}
                                className="mt-1.5 h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#4f2683] focus:ring-1 focus:ring-[#4f2683]/20"
                              />

                            </div>

                            <div className="mt-4">

                              <label className="text-xs font-bold text-gray-700">
                                Issue related to
                              </label>

                              <select
                                value={issueRelatedTo}
                                onChange={(e) => setIssueRelatedTo(e.target.value)}
                                className="mt-1.5 h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#4f2683] focus:ring-1 focus:ring-[#4f2683]/20"
                              >
                                <option value="">...</option>

                                <option value="software">
                                  Software (ie. Zoom, Sage, Adobe)
                                </option>

                                <option value="hardware">
                                  Hardware (ie. Printer, Scanner, Monitor)
                                </option>

                                <option value="it-request">
                                  I.T Request (Other)
                                </option>
                              </select>

                            </div>

                            <div className="mt-4">

                              <label className="text-xs font-bold text-gray-700">
                                Subject
                                <span className="ml-1 text-red-500">*</span>
                              </label>

                              <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="mt-1.5 h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#4f2683] focus:ring-1 focus:ring-[#4f2683]/20"
                              />

                            </div>

                            <div className="mt-5">

                              <button
                                onClick={() =>
                                  setWesternPopup(
                                    "Cannot attach files in simulation."
                                  )
                                }
                                className="inline-flex items-center gap-2 text-sm"
                              >

                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="-rotate-12 text-[#4f2683]"
                                >
                                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                </svg>

                                <span className="font-medium text-[#4f2683]">
                                  Attach files
                                </span>

                              </button>

                              <span className="ml-2 text-xs text-gray-500">
                                (File size &lt; 40 MB)
                              </span>

                            </div>

                            <div className="mt-6">

                              <button
                                onClick={() =>
                                  setWesternPopup(
                                    'Cannot associate assets in simulation.'
                                  )
                                }
                                className="flex items-center gap-2"
                              >

                                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                  >
                                    <line
                                      x1="12"
                                      y1="5"
                                      x2="12"
                                      y2="19"
                                    />
                                    <line
                                      x1="5"
                                      y1="12"
                                      x2="19"
                                      y2="12"
                                    />
                                  </svg>
                                </span>

                                <span className="text-sm font-medium text-[#172b4d]">
                                  Associate Assets
                                </span>

                              </button>

                            </div>

                          </div>

                          <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4">

                            <button
                              onClick={() => setWesternPage('home')}
                              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-[#172b4d] hover:bg-gray-50"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => {
                                const allFieldsFilled =
                                  requester.trim() !== "" &&
                                  issueRelatedTo !== "" &&
                                  subject.trim() !== "";

                                if (allFieldsFilled) {
                                  setCompletedTicketing(true);
                                  setWesternPopup(
                                    "Form submitted successfully. Please continue to the next module."
                                  );
                                } else {
                                  setWesternPopup(
                                    "Please fill out all required fields before submitting."
                                  );
                                }
                              }}
                              className="rounded-md bg-[#172b4d] px-5 py-2 text-sm font-medium text-white hover:bg-[#10213c]"
                            >
                              Submit
                            </button>

                          </div>

                        </div>

                        <div className="hidden w-72 shrink-0 bg-[#f5f7f9] p-7 lg:flex lg:flex-col">

                          <div className="flex flex-col items-center text-center">

                            <div className="mt-2 flex h-36 w-36 items-center justify-center">
                              <Image
                                src="/freshservice-icons/search.png"
                                alt="Helpdesk illustration"
                                width={144}
                                height={144}
                                className="h-full w-full object-contain"
                              />
                            </div>

                            <h2 className="mt-3 text-base font-bold text-[#172b4d]">
                              Looking to solve your issue quickly?
                            </h2>

                            <p className="mt-3 text-sm leading-5 text-gray-600">
                              Add more details to the subject to see relevant articles
                              right here!
                            </p>

                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="h-12 shrink-0 bg-[#4f2683]" />

                </div>
              )}

              {westernPopup && (
                <div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  onClick={() => setWesternPopup(null)}
                >
                  <div
                    className="w-[400px] rounded-lg bg-white p-6 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <h2 className="text-lg font-semibold text-gray-900">
                      Information Systems
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                      {westernPopup}
                    </p>

                    <div className="mt-6 flex justify-end">

                      <button
                        onClick={() => setWesternPopup(null)}
                        className="rounded-md bg-[#4f2683] px-5 py-2 text-sm font-medium text-white hover:bg-[#3d1d68]"
                      >
                        OK
                      </button>

                    </div>

                  </div>
                </div>
              )}

            </div>
            ) : (
              <ModuleIntro
                moduleId="western"
                title="Ticketing System"
                description="Learn how to report an issue using our ticketing system."
                icon="/usc-logo.png"
              />
            )
          )}

          {activeTab === 'calendar' && (
            moduleStarted.calendar ? (
              <div className="flex flex-1 min-h-0 bg-white">
                <iframe
                  src="https://scribehow.com/embed-preview/Google_Calendar_HowTo_Guide__yG_Ajbg0QMOMTYAFObpkxw?as=slides&size=flexible"
                  title="Google Calendar Training Guide"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <ModuleIntro
                moduleId="calendar"
                title="Google Calendar"
                description="Learn how to effectively use Google Calendar to manage your schedule, create events, and stay organized."
                icon="/google_calendar.webp"
              />
            )
          )}

          {activeTab === 'trello' && (
            moduleStarted.trello ? (
              <div className="flex flex-1 min-h-0 bg-white">
                <iframe
                  src="https://scribehow.com/embed-preview/How_to_Add_a_Comment_to_a_Trello_Card__BIHw7BY4TAGKrd78_nWwGA?as=slides&size=flexible"
                  title="Trello Training Guide"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <ModuleIntro
                moduleId="trello"
                title="Trello"
                description="Learn how to communicate and collaborate effectively in Trello by adding comments to cards and working with your team."
                icon="/trello-logo-icon.webp"
              />
            )
          )}

          {activeTab === 'rippling' && (
            moduleStarted.rippling ? (
              <div className="flex flex-1 min-h-0 bg-white">
                <iframe
                  src="https://scribehow.com/embed-preview/Submit_a_Time_Off_Request_on_Rippling__BMcuOfhpTtO2r9UbSxketQ?as=slides&size=flexible"
                  title="Rippling Training Guide"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <ModuleIntro
                moduleId="rippling"
                title="Rippling"
                description="Learn how to submit a time-off request through Rippling. This guide will walk you through the process step by step."
                icon="/rippling-logo.png"
              />
            )
          )}

          {activeTab === 'modules' && (
            <ModuleCompletion
              onComplete={() => {
                setSlidesSeen(false);
                setActiveTab('phishquest');
              }}
              completedDrive={completedDrive}
              completedCalendar={completedCalendar}
              completedTrello={completedTrello}
              completedRippling={completedRippling}
              completedEmails={gameComplete}
              completedTicketing={completedTicketing}
              completedSlack={completedSlack}
            />
          )}
        </div>
        )}

        {!isSlackClosed && (
          <div className="absolute left-[20%] top-[8%] z-30 h-[75vh] w-[50vw]">
            <SlackApp
              playerName={state.playerName}
              onMinimize={() => setisSlackClosed(true)}
              onClose={() => setisSlackClosed(true)}
              setCompletedSlack={setCompletedSlack}
            />
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
          <button
            onClick={() => setisChromeClosed((prev) => !prev)}
            className={`flex h-10 items-center gap-2 rounded px-3 transition-colors ${
              isChromeClosed
                ? 'hover:bg-white/10'
                : 'border-b-2 border-white/70 bg-white/10'
            }`}
          >
            <Image
              src="/chrome_icon.webp"
              alt="Chrome"
              width={24}
              height={24}
            />
          </button>

          <button
            onClick={() => setisSlackClosed((prev) => !prev)}
            className={`flex h-10 items-center gap-2 rounded px-3 transition-colors ${
              isSlackClosed
                ? 'hover:bg-white/10'
                : 'border-b-2 border-white/70 bg-white/10'
            }`}
          >
            <Image
              src="/slack_logo_icon.webp"
              alt="Slack"
              width={24}
              height={24}
            />
          </button>

          <button
            className={`flex h-10 items-center gap-2 rounded px-3 transition-colors`}
          >
            <Image
              src="/outlook.webp"
              alt="Outlook"
              width={24}
              height={24}
            />
          </button>

          <button
            className={`flex h-10 items-center gap-2 rounded px-3 transition-colors`}
          >
            <Image
              src="/edge.png"
              alt="Edge"
              width={24}
              height={24}
            />
          </button>

          <button
            className={`flex h-10 items-center gap-2 rounded px-3 transition-colors`}
          >
            <Image
              src="/store.png"
              alt="Store"
              width={24}
              height={24}
            />
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
