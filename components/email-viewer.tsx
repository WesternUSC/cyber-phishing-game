'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Paperclip, ExternalLink, ChevronDown, ChevronUp, Fish, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Email, EmailLink } from '@/lib/types';
import { SenderAvatar } from '@/components/sender-avatar';
import { CompromisedModal } from '@/components/compromised-modal';
import { SenderHoverCard } from '@/components/sender-hover-card';

interface Props {
  email: Email | undefined;
  isReviewed: boolean;
  onSubmit: (decision: 'phish' | 'safe') => void;
  onPhishLinkClicked: () => void;
  isTablet?: boolean;
}

export function EmailViewer({ email, isReviewed, onSubmit, onPhishLinkClicked, isTablet = false }: Props) {
  const [headersOpen, setHeadersOpen] = useState(false);
  const [compromisedOpen, setCompromisedOpen] = useState(false);
  // Tablet only: holds the display URL of a safe link the user tapped
  const [blockedLink, setBlockedLink] = useState<{ label: string; displayUrl: string } | null>(null);

  function handleLinkClick(link: EmailLink) {
    if (link.isSuspicious) {
      setCompromisedOpen(true);
    } else if (isTablet) {
      setBlockedLink({ label: link.label, displayUrl: link.displayUrl });
    } else {
      window.open(link.actualUrl, '_blank', 'noopener,noreferrer');
    }
  }

  // Event delegation for links embedded in bodyHtml (<a href="#link-0">, etc.)
  function handleBodyClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('data-link-index') ?? '';
    const match = href.match(/^#link-(\d+)$/);
    if (!match) return;

    e.preventDefault();
    if (!email) return;

    const idx = parseInt(match[1], 10);
    const link = email.links[idx];
    if (!link) return;

    handleLinkClick(link);
  }

  function handleCompromisedClose() {
    setCompromisedOpen(false);
    if (!isReviewed) {
      onPhishLinkClicked();
    }
  }

  if (!email) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-12 text-gray-400">
        <Image src="/usc-logo.png" alt="USC Logo" width={64} height={64} className="opacity-30" />
        <p className="text-sm">Select an email from your inbox to inspect it</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Email header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-normal text-gray-900">{email.subject}</h2>
          <div className="mt-3 flex items-start gap-3">
            <SenderHoverCard senderEmail={email.senderEmail} senderName={email.senderName} senderAvatar={email.senderAvatar} isPfp={true} />

            {/* <SenderAvatar
              senderName={email.senderName}
              senderAvatar={email.senderAvatar}
              size={36}
            /> */}
            
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">

                {/* <span className="font-medium text-gray-900" title={email.senderEmail}>
                  {email.senderName}
                </span> */}

                <SenderHoverCard senderEmail={email.senderEmail} senderName={email.senderName} senderAvatar={email.senderAvatar} isPfp={false} />

                {/* <span className="text-xs text-gray-500">
                  &lt;{email.senderEmail}&gt;
                </span> */}
              </div>
              <div className="text-xs text-gray-500">
                to me &bull; {email.date} at {email.time}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Email body — click handler intercepts #link-N anchors */}
          <div
            className="email-body prose prose-sm max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: email.bodyHtml.join('\n') }}
            onClick={handleBodyClick}
          />

          {/* Links panel */}
          {/* {email.links.length > 0 && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Links in this email
              </p>
              <div className="flex flex-col gap-2">
                {email.links.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => handleLinkClick(link)}
                    className="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-left transition hover:bg-gray-50"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span className="font-medium text-gray-700">{link.label}</span>
                    <span className="ml-auto font-mono text-gray-500 break-all">{link.actualUrl}</span>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Attachments */}
          {email.attachments.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {email.attachments.map((att) => (
                <div
                  key={att.filename}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  <span className="font-medium">{att.filename}</span>
                  <span className="uppercase opacity-60">{att.type}</span>
                </div>
              ))}
            </div>
          )}

          {/* Raw headers
          {email.rawHeaders && (
            <div className="mt-4">
              <button
                onClick={() => setHeadersOpen((v) => !v)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
              >
                {headersOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
                {headersOpen ? 'Hide' : 'Show'} raw headers
              </button>
              {headersOpen && (
                <pre className="mt-2 overflow-x-auto rounded-md bg-gray-100 p-3 font-mono text-xs text-gray-700 whitespace-pre-wrap">
                  {email.rawHeaders}
                </pre>
              )}
            </div>
          )} */}
        </div>

        {/* Decision bar */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          {isReviewed ? (
            <p className="text-center text-sm text-gray-500">
              You have already reviewed this email. Select another from your inbox.
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <p className="mr-2 text-sm font-medium text-gray-700">Your verdict:</p>
              <button
                onClick={() => onSubmit('phish')}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800"
              >
                <Fish className="h-4 w-4" />
                Report Phishing
              </button>
              <button
                onClick={() => onSubmit('safe')}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-green-600 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 active:bg-green-100"
              >
                <ShieldCheck className="h-4 w-4" />
                Mark as Safe
              </button>
            </div>
          )}
        </div>
      </div>

      <CompromisedModal open={compromisedOpen} onClose={handleCompromisedClose} />

      {/* Tablet: safe-link blocked modal */}
      {blockedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#e8f5e9] px-6 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-900">Legitimate Link</p>
                <p className="text-xs text-green-700">External navigation disabled</p>
              </div>
            </div>
            {/* Body */}
            <div className="px-6 py-5 space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">&ldquo;{blockedLink.label}&rdquo;</span> is a real,
                safe link. In a desktop browser it would open:
              </p>
              <p className="rounded-lg bg-gray-100 px-3 py-2 font-mono text-xs break-all text-gray-600">
                {blockedLink.displayUrl}
              </p>
              <p className="text-xs text-gray-400">
                External links are disabled during iPad training sessions to keep you in the app.
              </p>
            </div>
            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4">
              <button
                onClick={() => setBlockedLink(null)}
                className="w-full rounded-lg bg-[#4f2584] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d1d68]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
