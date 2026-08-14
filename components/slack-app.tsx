'use client';

import Image from 'next/image';
import { useState } from 'react';

type SlackAppProps = {
  playerName: string;
  onMinimize: () => void;
  onClose: () => void;
};

type EricMessage = {
  id: number;
  sender: 'eric' | 'player';
  text: string;
  time: string;
};

export default function SlackApp({
  playerName,
  onMinimize,
  onClose,
}: SlackAppProps) {
  const [currentConversation, setCurrentConversation] =
    useState<'general' | 'eric'>('general');

  const [message, setMessage] = useState('');

  const [showGeneralPopup, setShowGeneralPopup] = useState(false);

  const [ericMessages, setEricMessages] = useState<EricMessage[]>([
    {
      id: 1,
      sender: 'eric',
      text: "Hey! How's it going?",
      time: '07:02 AM',
    },
  ]);

  const isEricConversation = currentConversation === 'eric';

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || !isEricConversation) return;

    const playerMessage: EricMessage = {
      id: Date.now(),
      sender: 'player',
      text: trimmedMessage,
      time: getCurrentTime(),
    };

    setEricMessages((previousMessages) => [
      ...previousMessages,
      playerMessage,
    ]);

    setMessage('');

    setTimeout(() => {
      const ericReply: EricMessage = {
        id: Date.now() + 1,
        sender: 'eric',
        text: 'Thank you for completing this module. Please continue to the next one.',
        time: getCurrentTime(),
      };

      setEricMessages((previousMessages) => [
        ...previousMessages,
        ericReply,
      ]);
    }, 800);
  };

  const handleGeneralInputClick = () => {
    if (!isEricConversation) {
      setShowGeneralPopup(true);
    }
  };

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

              <button
                onClick={() => {
                  setCurrentConversation('general');
                  setShowGeneralPopup(false);
                  setMessage('');
                }}
                className={`mt-2 w-full rounded px-3 py-2 text-left text-sm ${
                  currentConversation === 'general'
                    ? 'bg-white/15'
                    : 'hover:bg-white/10'
                }`}
              >
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

              <button
                onClick={() => {
                  setCurrentConversation('eric');
                  setShowGeneralPopup(false);
                  setMessage('');
                }}
                className={`mt-2 w-full rounded px-3 py-2 text-left text-sm ${
                  currentConversation === 'eric'
                    ? 'bg-white/15'
                    : 'hover:bg-white/10'
                }`}
              >
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
              {isEricConversation ? 'Eric Svechnikov' : '# general'}
            </h1>

            <p className="text-xs text-gray-500">
              {isEricConversation
                ? 'Direct message'
                : 'General conversation'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">

            {isEricConversation ? (
              <div className="space-y-5">

                {ericMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex gap-3"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded text-sm font-semibold text-white ${
                        msg.sender === 'eric'
                          ? 'bg-gray-500'
                          : 'bg-[#611f69]'
                      }`}
                    >
                      {msg.sender === 'eric'
                        ? 'ES'
                        : playerName.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold">
                          {msg.sender === 'eric'
                            ? 'Eric Svechnikov'
                            : playerName}
                        </span>

                        <span className="text-xs text-gray-400">
                          {msg.time}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-700">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
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
                      06:32 AM
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-700">
                    Hi everyone! Please remember to complete your
                    cybersecurity training this week.
                  </p>
                </div>
              </div>
            )}

          </div>

          <div className="relative border-t border-gray-200 p-4">

            {showGeneralPopup && !isEricConversation && (
              <div className="absolute bottom-20 left-4 z-10 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#611f69] text-sm text-white">
                    !
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Please click the Eric chat
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      This conversation is currently unavailable.
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => setShowGeneralPopup(false)}
                  className="mt-3 w-full rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
                >
                  Got it
                </button>
              </div>
            )}

            <div
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                isEricConversation
                  ? 'border-gray-300 focus-within:border-[#611f69] focus-within:ring-1 focus-within:ring-[#611f69]'
                  : 'cursor-pointer border-gray-300 hover:border-gray-400'
              }`}
              onClick={handleGeneralInputClick}
            >

              <input
                type="text"
                value={message}
                onChange={(e) => {
                  if (isEricConversation) {
                    setMessage(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                onFocus={() => {
                  if (!isEricConversation) {
                    setShowGeneralPopup(true);
                  }
                }}
                readOnly={!isEricConversation}
                placeholder={
                  isEricConversation
                    ? 'Message Eric Svechnikov'
                    : 'Message #general'
                }
                className={`min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 ${
                  !isEricConversation
                    ? 'cursor-pointer'
                    : ''
                }`}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isEricConversation) {
                    setShowGeneralPopup(true);
                    return;
                  }

                  handleSendMessage();
                }}
                disabled={isEricConversation && !message.trim()}
                className="rounded-md bg-[#611f69] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#4a1752] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}