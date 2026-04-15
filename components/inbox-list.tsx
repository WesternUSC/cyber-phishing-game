'use client';

import { Paperclip, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Email, Decision } from '@/lib/types';

interface Props {
  emails: Email[];
  selectedId: string | null;
  reviewed: string[];
  decisions: Record<string, Decision>;
  onSelect: (id: string) => void;
}

export function InboxList({ emails, selectedId, reviewed, decisions, onSelect }: Props) {
  return (
    <div className="flex flex-col divide-y divide-gray-200 overflow-auto">
      {emails.map((email, index) => {
        const isSelected = email.id === selectedId;
        const isReviewed = reviewed.includes(email.id);
        const decision = decisions[email.id];

        return (
          <button
            key={email.id}
            onClick={() => onSelect(email.id)}
            className={cn(
              'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#f2f6fc] focus:outline-none',
              isSelected && 'bg-[#e8f0fe]',
              !isSelected && !isReviewed && 'bg-white',
              !isSelected && isReviewed && 'bg-[#f6f8fc]',
            )}
          >
            {/* Level badge */}
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4f2584] text-xs font-bold text-white">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'truncate text-sm',
                    !isReviewed ? 'font-semibold text-gray-900' : 'font-normal text-gray-600',
                  )}
                >
                  {email.senderName}
                </span>
                <span className="shrink-0 text-xs text-gray-500">{email.time}</span>
              </div>
              <div
                className={cn(
                  'truncate text-sm',
                  !isReviewed ? 'text-gray-900' : 'text-gray-600',
                )}
              >
                {email.subject}
              </div>
              <div className="truncate text-xs text-gray-500">{email.preview}</div>

              {/* Badges + result */}
              <div className="mt-1 flex flex-wrap items-center gap-1">
                {email.badges.map((badge) => (
                  <span
                    key={badge}
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                      badge === 'Urgent' && 'bg-red-100 text-red-700',
                      badge === 'External' && 'bg-yellow-100 text-yellow-700',
                      badge === 'Attachment' && 'bg-blue-100 text-blue-700',
                    )}
                  >
                    {badge === 'Attachment' && (
                      <Paperclip className="mr-0.5 inline h-2.5 w-2.5" />
                    )}
                    {badge}
                  </span>
                ))}

                {isReviewed && decision && (
                  <span
                    className={cn(
                      'ml-auto flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                      decision.correct
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700',
                    )}
                  >
                    {decision.correct ? (
                      <CheckCircle className="h-2.5 w-2.5" />
                    ) : (
                      <AlertTriangle className="h-2.5 w-2.5" />
                    )}
                    {decision.correct ? 'Correct' : 'Missed'}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
