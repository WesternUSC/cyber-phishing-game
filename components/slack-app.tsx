'use client';

import Image from 'next/image';

type SlackAppProps = {
  playerName: string;
  onMinimize: () => void;
  onClose: () => void;
};

export default function SlackApp({
  playerName,
  onMinimize,
  onClose,
}: SlackAppProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_rgba(0,0,0,0.65)]">

      <div className="flex h-10 shrink-0 items-center justify-between bg-[#3f0e40] px-4 text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/slack_logo_icon.webp"
            alt="Slack"
            width={20}
            height={20}
          />

          <span className="text-sm font-medium">
            Slack
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={onMinimize}
            className="flex h-10 w-10 items-center justify-center hover:bg-white/10"
          >
            —
          </button>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">

        <aside className="w-64 shrink-0 bg-[#3f0e40] text-white">

          <div className="border-b border-white/10 px-4 py-4">
            <p className="text-sm font-semibold">
              Western USC
            </p>

            <p className="text-xs text-white/60">
              Workspace
            </p>
          </div>

          <div className="p-3">

            <button className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
              🔍 Find a conversation
            </button>

            <div className="mt-5">
              <p className="px-3 text-xs font-semibold uppercase text-white/50">
                Channels
              </p>

              <button className="mt-2 w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
                # general
              </button>

              <button className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
                # it-support
              </button>

              <button className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
                # announcements
              </button>
            </div>

            <div className="mt-6">
              <p className="px-3 text-xs font-semibold uppercase text-white/50">
                Direct messages
              </p>

              <button className="mt-2 w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
                Eric Svechnikov
              </button>

              <button className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10">
                Test Name 2
              </button>
            </div>

          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-white">

          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-lg font-semibold text-gray-900">
              # general
            </h1>

            <p className="text-xs text-gray-500">
              General conversation
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">

            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#611f69] text-sm font-semibold text-white">
                IT
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">
                    IT Support
                  </span>

                  <span className="text-xs text-gray-400">
                    10:32 AM
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-700">
                  Hi everyone! Please remember to complete your
                  cybersecurity training this week.
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-400">
              Message #general
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}