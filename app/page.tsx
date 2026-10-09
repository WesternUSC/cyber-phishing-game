'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-context";

type User = {
  name: string;
  title: string;
  supervisor: string;
  email: string;
  loginCode: string;
  scribe1: string;
  scribe2: string;
  scribe3: string;
  scribe4: string;
  scribe5: string;
  scribe6: string;
  scribe7: string;
};

export default function HomePage() {
  const { userData, setUserData } = useApp();
  //const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [nameInput, setNameInput] = useState('');
  const [title, setTitle] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [scribe1, setscribe1] = useState('');
  const [scribe2, setscribe2] = useState('');
  const [scribe3, setscribe3] = useState('');
  const [scribe4, setscribe4] = useState('');
  const [scribe5, setscribe5] = useState('');
  const [scribe6, setscribe6] = useState('');
  const [scribe7, setscribe7] = useState('');

  const [loginCode, setLoginCode] = useState('');

  const router = useRouter();

  const [nameError, setNameError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  function resetGame(shouldReload?: boolean) {
    localStorage.clear();
    sessionStorage.clear();

    if (shouldReload) {
      window.location.reload();
    }
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

      // if (event.key.toLowerCase() === 'r') {
      //   resetGame(true);
      // }

      // if (event.key.toLowerCase() === 's') {
      //   setSlidesSeen(true);
      // }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // read csv file
  useEffect(() => {
    fetch('login_info.csv')
      .then((response) => response.text())
      .then((csv) => {
        const rows = csv
          .trim()
          .split('\n')
          .map((row) => row.split(','));

        const parsedUsers = rows.map(([name, email, loginCode, title, supervisor, scribe1, scribe2, scribe3, scribe4, scribe5, scribe6, scribe7]) => ({
          name: name.trim().replace(/[,"]/g, ''),
          email: email.trim(),
          loginCode: loginCode.trim(),
          title: title.trim(),
          supervisor: supervisor.trim(),
          scribe1: scribe1.trim(),
          scribe2: scribe2.trim(),
          scribe3: scribe3.trim(),
          scribe4: scribe4.trim(),
          scribe5: scribe5.trim(),
          scribe6: scribe6.trim(),
          scribe7: scribe7.trim()
        }));

        
        console.log('---------PARSED USERS---------');
        console.table(parsedUsers);
        console.log('-------------------------');
        

        setUsers(parsedUsers);
      })
      .catch((error) => {
        console.error('Could not load CSV:', error);
      });
  }, []);

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

    //setNameInput(player.name);
    setTitle(player.title);
    setSupervisor(player.supervisor);
    setscribe1(player.scribe1);
    setscribe2(player.scribe2);
    setscribe3(player.scribe3);
    setscribe4(player.scribe4);
    setscribe5(player.scribe5);
    setscribe6(player.scribe6);
    setscribe7(player.scribe7);
    setLoginCode(player.loginCode);
    setUserEmail(player.email);

    setNameError(false);
    //setNameEntered(true);

    setUserData((prev) => ({
      ...prev,
      name: player.name,
      title: player.title,
      scribe1: player.scribe1,
      scribe2: player.scribe2,
      scribe3: player.scribe3,
      scribe4: player.scribe4,
      scribe5: player.scribe5,
      scribe6: player.scribe6,
      scribe7: player.scribe7,
      supervisor: player.supervisor,
      email: player.email,
    }));

    const values = {
      name: player.name,
      title: player.title,
      supervisor: player.supervisor,
      scribe1: player.scribe1,
      scribe2: player.scribe2,
      scribe3: player.scribe3,
      scribe4: player.scribe4,
      scribe5: player.scribe5,
      scribe6: player.scribe6,
      scribe7: player.scribe7,
      loginCode: player.loginCode,
      userEmail: player.email,
    };

    Object.entries(values).forEach(([key, value]) => {
      localStorage.setItem(key, value ?? "");
    });

    router.push('/home');
  }

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
              USC Onboarding
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

    return nameContent;
}