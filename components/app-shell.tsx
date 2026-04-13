import Image from 'next/image';
import { Search } from 'lucide-react';

interface Props {
  playerName: string;
  score: number;
  total: number;
}

export function AppShell({ playerName, score, total }: Props) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/usc-logo.png" alt="USC Logo" width={36} height={36} />
        <span className="text-xl font-normal text-gray-700">
          Phish<span className="font-semibold text-[#4f2584]">Quest</span>
        </span>
      </div>

      {/* Search bar (decorative, Gmail-style) */}
      <div className="mx-4 flex flex-1 items-center gap-2 rounded-full bg-[#eaf1fb] px-4 py-2 max-w-xl">
        <Search className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Search mail</span>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {total > 0 && (
          <div className="rounded-full bg-[#e8f0fe] px-3 py-1 text-sm font-medium text-[#1a73e8]">
            {score}/{total} correct
          </div>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f2584] text-sm font-semibold text-white">
          {playerName.charAt(0).toUpperCase() || '?'}
        </div>
      </div>
    </header>
  );
}
