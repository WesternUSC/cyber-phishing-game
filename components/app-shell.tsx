import { ShieldAlert } from 'lucide-react';

export function AppShell({ playerName }: { playerName: string }) {
  return (
    <header className="mb-4 flex items-center justify-between rounded-lg border bg-white p-4">
      <div className="flex items-center gap-2 text-brand">
        <ShieldAlert className="h-5 w-5" />
        <h1 className="text-lg font-semibold">PhishQuest Inbox</h1>
      </div>
      <div className="text-sm text-slate-600">Signed in as <span className="font-semibold text-brand">{playerName || 'Guest'}</span></div>
    </header>
  );
}
