
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/app-context';
import WesternPopup from '@/components/western-popup';
import AskUSCModal from '@/components/ask-usc-modal';

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

type WeatherData = {
  temperature: number;
  code: number;
  isDay: number;
};

function getWeatherInfo(code: number, isDay: number) {
  if (code === 0) {
    return isDay ? { icon: '☀️', text: 'Clear sky' }
                 : { icon: '🌙', text: 'Clear night' };
  }

  if (code === 1 || code === 2) {
    return { icon: isDay ? '🌤️' : '☁️', text: 'Partly cloudy' };
  }

  if (code === 3) return { icon: '☁️', text: 'Overcast' };

  if ([45, 48].includes(code)) {
    return { icon: '🌫️', text: 'Foggy' };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { icon: '🌧️', text: 'Rainy' };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { icon: '❄️', text: 'Snowy' };
  }

  if ([95, 96, 99].includes(code)) {
    return { icon: '⛈️', text: 'Thunderstorm' };
  }

  return { icon: '🌡️', text: 'Current conditions' };
}

export default function HomePage() {
  const { userData, setUserData } = useApp();
  const router = useRouter();

  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [open, setOpen] = useState(false);

  const [loginCardFlipped, setLoginCardFlipped] = useState(false);

  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=42.9849&longitude=-81.2453&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&timezone=auto'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await response.json();

        if (!cancelled) {
          setWeather({
            temperature: data.current.temperature_2m,
            code: data.current.weather_code,
            isDay: data.current.is_day,
          });
          setWeatherError(false);
        }
      } catch (error) {
        console.error('Could not load weather:', error);
        if (!cancelled) setWeatherError(true);
      }
    }

    loadWeather();

    const interval = setInterval(loadWeather, 15 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  function handleSupportPortal() {
    setOpen(!open);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const response = await fetch('/login_info.csv');

        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.status}`);
        }

        const csv = await response.text();

        const rows = csv
          .replace(/^\uFEFF/, '')
          .trim()
          .split(/\r?\n/)
          .filter(Boolean)
          .map((row) => row.split(','));

        const parsedUsers: User[] = rows.map((row) => {
          const [
            name = '',
            email = '',
            loginCode = '',
            title = '',
            supervisor = '',
            scribe1 = '',
            scribe2 = '',
            scribe3 = '',
            scribe4 = '',
            scribe5 = '',
            scribe6 = '',
            scribe7 = '',
          ] = row;

          return {
            name: name.trim().replace(/["]/g, ''),
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
            scribe7: scribe7.trim(),
          };
        });

        // remove the header if the CSV contains column names.
        const data = parsedUsers.filter(
          (user) => user.loginCode.toLowerCase() !== 'logincode'
        );

        if (!cancelled) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Could not load CSV:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  function enteredName() {
    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError(true);
      setShowPopup(true);
      return;
    }

    const player = users.find(
      (user) => user.loginCode === trimmed
    );

    if (!player) {
      setNameError(true);
      setShowPopup(true);
      return;
    }

    setNameError(false);
    setShowPopup(false);
    setLoginCardFlipped(true);

    setUserData((prev) => ({
      ...prev,
      name: player.name,
    }));
  }

  function start() {
    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError(true);
      setShowPopup(true);
      return;
    }

    const player = users.find(
      (user) => user.loginCode === trimmed
    );

    if (!player) {
      setNameError(true);
      setShowPopup(true);
      return;
    }

    setUserData((prev) => ({
      ...prev,
      name: player.name,
      title: player.title,
      supervisor: player.supervisor,
      email: player.email,
      scribe1: player.scribe1,
      scribe2: player.scribe2,
      scribe3: player.scribe3,
      scribe4: player.scribe4,
      scribe5: player.scribe5,
      scribe6: player.scribe6,
      scribe7: player.scribe7,
    }));

    const values: Record<string, string> = {
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
      localStorage.setItem(key, value ?? '');
    });

    setNameError(false);
    router.push('/home');
  }

  return (
     
  <main
    className="flex min-h-screen w-full items-center justify-center overflow-x-hidden p-4 py-10 sm:p-6 sm:py-10 lg:p-10 text-white"
    style={{
      backgroundColor: '#582c83',
      backgroundImage:
        'radial-gradient(ellipse at 10% 10%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(ellipse at 90% 90%, rgba(30,10,50,0.2), transparent 45%)',
    }}
  >
    <WesternPopup
      show={showPopup}
      title="Invalid login code"
      message="Please enter a valid login code."
      onClose={() => setShowPopup(false)}
    />

    <AskUSCModal
      isOpen={askOpen}
      onClose={() => setAskOpen(false)}
      questionText={question}
    />
    
    {open && (
      <div
        className="help-chat__overlay"
        onClick={() => setOpen(false)}
      >
        <div
          className="help-chat__box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-chat-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="help-chat__header">
            <span id="help-chat-title">How can we help?</span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help chat"
              className="help-chat__close"
            >
              ×
            </button>
          </div>

          <div className="help-chat__body">
            <iframe
              className="freshwidget-embedded-form"
              title="Submit a support ticket"
              src="https://westernusc.freshservice.com/widgets/feedback_widget/new?&widgetType=embedded&submitThanks=Thank%20you%20for%20submitting%20the%20ticket.&screenshot=no"
              scrolling="no"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    )}

    <style jsx>{`
      .help-chat__overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(15, 8, 25, 0.5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: help-overlay-in 0.2s ease-out;
      }

      .help-chat__box {
        position: relative;
        width: 500px;
        max-width: 100%;
        max-height: calc(100dvh - 40px);
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        animation: help-modal-in 0.25s ease-out;
      }

      .help-chat__header {
        flex-shrink: 0;
        background: #4f2584;
        color: white;
        padding: 16px 20px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .help-chat__close {
        border: 0;
        background: transparent;
        color: white;
        font-size: 28px;
        cursor: pointer;
        line-height: 1;
        padding: 0 4px;
      }

      .help-chat__body {
        padding: 0;
        height: min(600px, calc(100dvh - 120px));
        min-height: 300px;
        overflow: auto;
        background: white;
      }

      .freshwidget-embedded-form {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 500px;
        border: 0;
      }

      @keyframes help-overlay-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes help-modal-in {
        from {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @media (max-width: 480px) {
        .help-chat__overlay {
          padding: 12px;
        }

        .help-chat__box {
          width: 100%;
          max-height: calc(100dvh - 24px);
          border-radius: 12px;
        }

        .help-chat__body {
          height: calc(100dvh - 110px);
          min-height: 250px;
        }
      }

      .login-flip-card {
        position: relative;
        width: 100%;
        height: 300px;
        perspective: 1200px;
        -webkit-perspective: 1200px;
        border-radius: 1.5rem;
        transition:
          transform 0.3s ease,
          filter 0.3s ease;
      }

      .login-flip-card:hover {
        transform: translateY(-4px);
        filter: drop-shadow(0 18px 24px rgba(35, 12, 60, 0.2));
      }

      .login-flip-face {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.76);
        color: #582c83;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.9),
          0 8px 32px rgba(35, 12, 60, 0.08);
        backdrop-filter: blur(24px) saturate(150%);
        -webkit-backdrop-filter: blur(24px) saturate(150%);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition:
          transform 0.75s cubic-bezier(0.2, 0.7, 0.2, 1),
          background 0.3s ease,
          border-color 0.3s ease;
      }

      .login-flip-card:hover .login-flip-face {
        border-color: rgba(255, 255, 255, 1);
        background: rgba(255, 255, 255, 0.86);
      }

      .login-flip-front {
        transform: rotateY(0deg);
        z-index: 2;
      }

      .login-flip-back {
        transform: rotateY(180deg);
        z-index: 1;
      }

      .login-flip-card.is-flipped .login-flip-front {
        transform: rotateY(-180deg);
        pointer-events: none;
      }

      .login-flip-card.is-flipped .login-flip-back {
        transform: rotateY(0deg);
        z-index: 3;
      }

      @media (prefers-reduced-motion: reduce) {
        .login-flip-card,
        .login-flip-face {
          transition-duration: 0.01ms;
        }
      }
    `}</style>

    <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">

        {/* TOP LEFT: USC LOGO */}
        <section className="relative min-w-0 h-full overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-4 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl min-h-[180px] lg:col-span-3">
          <div className="flex items-start justify-between">
            <span className="status-dot" aria-label="Dashboard active" />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-5">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/usc-logo-help-icon.png"
                alt="USC Logo"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        {/* TOP MIDDLE: LOGIN / ONBOARDING FLIP CARD */}
        <section className="min-w-0 min-h-[300px] lg:col-span-4">
          <div
            className={`login-flip-card ${
              loginCardFlipped ? 'is-flipped' : ''
            }`}
          >
            {/* FRONT: LOGIN */}
            <div className="login-flip-face login-flip-front relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 text-[#582c83] shadow-xl backdrop-blur-2xl">
              <div>
                <div className="mb-9 flex items-center gap-2" />

                <h2 className="text-xl font-semibold">
                  Your login code
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-[#582c83]/60">
                  Enter your assigned code to get started.
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="login-code"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#582c83]/75"
                >
                  Login code
                </label>

                <input
                  id="login-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={nameInput}
                  onChange={(event) => {
                    setNameInput(event.target.value);
                    if (nameError) setNameError(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') enteredName();
                  }}
                  placeholder="Enter your code"
                  aria-invalid={nameError}
                  aria-describedby={nameError ? 'login-error' : undefined}
                  className={`glass-input w-full rounded-xl bg-white px-4 py-3 text-sm text-black outline-none transition ${
                    nameError ? 'border-red-300/80' : ''
                  }`}
                />

                {nameError && (
                  <p
                    id="login-error"
                    role="alert"
                    className="mt-2 text-xs text-red-200"
                  >
                    Invalid login code. Please try again.
                  </p>
                )}

                <button
                  type="button"
                  onClick={enteredName}
                  disabled={loading}
                  className="primary-button mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? 'Loading...' : 'Enter'}
                  <span aria-hidden="true" className="ml-2">→</span>
                </button>
              </div>

              <p className="mt-4 text-xs text-[#582c83]/45">
                Your code personalizes your training experience.
              </p>
            </div>

            {/* BACK: ONBOARDING */}
            <div
              className="login-flip-face login-flip-back relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 text-[#582c83] shadow-xl backdrop-blur-2xl"
              aria-hidden={!loginCardFlipped}
              inert={!loginCardFlipped}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#582c83]/55">
                  You're all set
                </p>

                <h2 className="mt-5 text-2xl font-bold leading-tight">
                  Let's get started{userData.name ? `, ${userData.name}` : ''}.
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#582c83]/65">
                  Continue to your personalized USC onboarding experience.
                </p>
              </div>

              <button
                type="button"
                onClick={start}
                className="primary-button mt-8 flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-bold tracking-wider"
              >
                <span>ONBOARDING</span>
                <span className="text-lg" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* TOP RIGHT: WELCOME */}
        <section className="relative min-w-0 h-full overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl min-h-[300px] lg:col-span-3">
          <div className="welcome-orb" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="mt-2 max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Daily Policy
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#582c83]/70">
              Placeholder. Changes with a daily policy.
            </p>
          </div>
        </section>

        {/* HEALTH & DENTAL BENEFITS */}
        <a
          href="https://mapi.drawbridge.ca/auth/Account/Login?ReturnUrl=%2Fauth%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Duscstaff_drawbridge_ca%26redirect_uri%3Dhttps%253A%252F%252Fuscstaff.drawbridge.ca%252Fcallback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520members%2520offline_access%26state%3D7d7427a600da45888c7e8ea2958180bc%26code_challenge%3DeocNLsLREoxR6ulCDJaR0iw9cwpRMLczMbLToXr4H4M%26code_challenge_method%3DS256%26response_mode%3Dquery%26isEnrollment%3Dfalse"
          target="_blank"
          className="relative flex min-w-0 min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-5 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl lg:col-span-2"
        >
          <div>
            {/* <span className="text-3xl" aria-hidden="true">🩺</span> */}

            <h2 className="mt-5 text-xl font-bold leading-tight">
              Health & Dental Benefits
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#582c83]/65">
              Employee health and dental coverage.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm font-semibold">
            <span>Explore benefits</span>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

        {/* ASK USC */}
        <section className="relative min-w-0 min-h-[220px] overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl sm:col-span-2 lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#582c83]/50">
                USC Assistant
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Ask USC
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#582c83]/65">
                Have a question about onboarding, employee resources, or working at USC?
              </p>
            </div>

            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                const question = String(formData.get('question') ?? '').trim();

                if (!question) return;

                //console.log('Ask USC question:', question);
              }}
            >
              <input
                type="text"
                name="question"
                aria-label="Ask USC a question"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know?"
                className="glass-input min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-sm text-black outline-none transition"
              />

              <button
                type="submit"
                className="primary-button flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                onClick={() => setAskOpen(true)}
              >
                Ask USC
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </section>

        {/* BOTTOM LEFT: SUPPORT PORTAL */}
        <button
          type="button"
          onClick={handleSupportPortal}
          className="relative min-w-0 overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-5 text-left text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl min-h-[220px] sm:col-span-1 lg:col-span-2"
        >
          <div className="flex h-full flex-col justify-between gap-8">

            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                IT Support Portal
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#582c83]/65">
                Ticketing system
              </p>
            </div>
          </div>
        </button>

        {/* BOTTOM MIDDLE: WEATHER */}
        <section className="relative min-w-0 h-full overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-5 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl min-h-[220px] lg:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <span className="glass-label">WEATHER</span>
            <span className="text-xs text-[#582c83]/50">LIVE CONDITIONS</span>
          </div>

          <div className="my-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-[#582c83]/65">
                {weather ? getWeatherInfo(weather.code, weather.isDay).text
                  : weatherError ? 'Weather unavailable' : 'Loading weather...'}
              </p>

              <p className="mt-2 text-4xl font-light tracking-tight">
                {weather ? getWeatherInfo(weather.code, weather.isDay).icon : '🌡️'}
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-semibold">
                {weather ? `${Math.round(weather.temperature)}°` : '--°'}
              </p>
              <p className="mt-1 text-xs text-[#582c83]/60">
                Temperature · °C
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM RIGHT: RIPPLING */}
        <a 
          href="https://app.rippling.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="relative min-w-0 h-full overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-6 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl min-h-[220px] lg:col-span-2"
        >
          <div className="my-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#582c83]/50">
              Employee resources
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight">
              Rippling
            </h2>
          </div>

          <div
            className="primary-button flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-bold tracking-wider"
          >
            <span>OPEN RIPPLING</span>
            <span className="text-lg" aria-hidden="true">↗</span>
          </div>
        </a>

        {/* STAFF RESOURCES */}
        <a
          href="https://trello.com/b/Lymq35Fu/staff-resources?search_id=899acfe6-9e04-4d12-bb69-52810869a66b"
          target="_blank"
          className="relative flex min-w-0 min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-5 text-[#582c83] shadow-xl backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.86] hover:shadow-2xl lg:col-span-2"
        >
          <div>
            {/* <span className="text-3xl" aria-hidden="true">📚</span> */}

            <h2 className="mt-5 text-xl font-bold leading-tight">
              Staff Resources
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#582c83]/65">
              Staff resources Trello board
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm font-semibold">
            <span>View resources</span>
            <span aria-hidden="true">↗</span>
          </div>
        </a>

      </div>

      {/* <footer className="mx-auto mt-6 flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#582c83]/45">
        <span>© USC Information Security Training</span>
      </footer> */}
    </main>
  );
}
