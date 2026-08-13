'use client';

import { useEffect, useRef, useState } from 'react';

import { getStoredSignature, saveSignature } from '@/lib/module-signature';

const COMPLETED_MODULES_KEY = 'cyber-training-completed-modules';

const MODULES = [
  {
    id: 'email-security',
    title: 'Email Security',
    description: 'Identify suspicious senders, attachments, links, and unusual email requests.',
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    description: 'Learn practical ways to organize, find, share, and secure files in Google Drive.',
  },
  {
    id: 'ticketing-system',
    title: 'Ticketing System',
    description: 'Learn how to submit an Information Systems support ticket.',
  },
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Understand how to view other calendars, manage shared calendars, invite guests, and schedule conflict-free meetings.',
  },
  {
    id: 'trello',
    title: 'Trello',
    description: 'Learn how to add a comment to a trello card.',
  },
  {
    id: 'rippling',
    title: 'Rippling',
    description: 'Learn how to submit a time off request on Rippling.',
  },
];

type ModuleCompletionProps = {
  onComplete: () => void;
};

export default function ModuleCompletion({
  onComplete,
  }: ModuleCompletionProps) {
    const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(COMPLETED_MODULES_KEY);

      if (!stored) return [];

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      COMPLETED_MODULES_KEY,
      JSON.stringify(completed),
    );
  }, [completed]);

  const [signatureExists, setSignatureExists] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const allModulesComplete = completed.length === MODULES.length;

  useEffect(() => {
    const stored = getStoredSignature();
    if (stored) {
      setSignatureExists(true);
    }
  }, []);

  useEffect(() => {
    if (!allModulesComplete || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#172b4d';
  }, [allModulesComplete]);

  function toggleModule(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((moduleId) => moduleId !== id)
        : [...current, id],
    );
  }

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getCanvasPoint(event);

    if (!canvas || !ctx || !point) return;

    canvas.setPointerCapture(event.pointerId);

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);

    setIsDrawing(true);
    setHasSignature(true);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getCanvasPoint(event);

    if (!canvas || !ctx || !point) return;

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  function stopDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;

    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dpr = window.devicePixelRatio || 1;
    ctx.lineWidth = 2.2 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#172b4d';

    setHasSignature(false);
  }

  function confirmCompletion() {
    const canvas = canvasRef.current;

    if (!canvas || !hasSignature) return;

    const signature = canvas.toDataURL('image/png');

    saveSignature(signature);

    setSignatureExists(true);

    setTimeout(() => {
      onComplete();
    }, 150);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f6f8fc]">

      <div className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-10 py-8">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4f2584] text-white">
                  ✓
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#4f2584]">
                  Cyber Security Training
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-gray-900">
                Training Modules
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Review each security training module and confirm that you have
                completed it. Once all modules are complete, you will be asked
                to provide your signature.
              </p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Progress
              </p>

              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {completed.length}
                <span className="text-sm font-normal text-gray-400">
                  {' '}
                  / {MODULES.length}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#4f2584] transition-all duration-300"
              style={{
                width: `${(completed.length / MODULES.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-10 py-8">
        <div className="space-y-3">
          {MODULES.map((module, index) => {
            const isComplete = completed.includes(module.id);

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleModule(module.id)}
                className={`group flex w-full items-center gap-5 rounded-xl border bg-white p-5 text-left transition ${
                  isComplete
                    ? 'border-[#4f2584]/30 bg-[#faf8fd] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >

                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${
                    isComplete
                      ? 'border-[#4f2584] bg-[#4f2584]'
                      : 'border-gray-300 bg-white group-hover:border-[#4f2584]'
                  }`}
                >
                  {isComplete && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                <div
                  className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:flex ${
                    isComplete
                      ? 'bg-[#ede7f6] text-[#4f2584]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className={`text-sm font-semibold ${
                      isComplete ? 'text-[#4f2584]' : 'text-gray-900'
                    }`}
                  >
                    {module.title}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {module.description}
                  </p>
                </div>

                <div className="hidden shrink-0 sm:block">
                  {isComplete ? (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      Not completed
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {allModulesComplete && (
          <div className="mt-8 overflow-hidden rounded-xl border border-[#4f2584]/20 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-[#faf8fd] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4f2584] text-white">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4Z" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Training Acknowledgement
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    All six modules have been completed.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-gray-600">
                By signing below, I confirm that I have completed and reviewed
                all required security training modules.
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Signature
                  </label>

                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-xs font-medium text-[#4f2584] hover:underline"
                  >
                    Clear
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white">
                  <canvas
                    ref={canvasRef}
                    className="h-40 w-full cursor-crosshair touch-none"
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerCancel={stopDrawing}
                    onPointerLeave={stopDrawing}
                  />

                  <div className="pointer-events-none absolute bottom-4 left-6 right-6 border-b border-gray-200" />

                  {!hasSignature && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-gray-300">
                        Draw your signature here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-end gap-3 sm:flex-row sm:justify-between">
                <div className="text-xs text-gray-400">
                  Your signature is saved securely within this training
                  session.
                </div>

                <button
                  type="button"
                  disabled={!hasSignature}
                  onClick={confirmCompletion}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${
                    hasSignature
                      ? 'bg-[#4f2584] hover:bg-[#3d1d68]'
                      : 'cursor-not-allowed bg-gray-300'
                  }`}
                >
                  Confirm & Complete Training
                </button>
              </div>
            </div>
          </div>
        )}

        {!allModulesComplete && (
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4">
            <div className="flex gap-3">
              <svg
                className="mt-0.5 shrink-0 text-blue-600"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>

              <p className="text-sm text-blue-800">
                Complete all six modules above to unlock the training
                acknowledgement and signature field.
              </p>
            </div>
          </div>
        )}

        {/* {signatureExists && (
          <div className="mt-4 rounded-lg border border-green-100 bg-green-50 px-5 py-3 text-sm text-green-700">
            A training signature has previously been saved for this session.
          </div>
        )} */}
      </div>
    </div>
  );
}
