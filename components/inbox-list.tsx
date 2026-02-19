import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmailScenario } from '@/data/emails';
import { cn } from '@/lib/utils';

export function InboxList({ emails, selectedId, reviewed, onSelect }: { emails: EmailScenario[]; selectedId: string | null; reviewed: string[]; onSelect: (id: string) => void }) {
  return (
    <ScrollArea className="h-[60vh] rounded-lg border bg-white">
      <div className="divide-y">
        {emails.map((email) => (
          <button key={email.id} onClick={() => onSelect(email.id)} className={cn('w-full space-y-1 p-3 text-left transition hover:bg-brand/5', selectedId === email.id && 'bg-brand/10')}>
            <div className="flex items-center justify-between text-sm"><span className="font-semibold">{email.senderName}</span><span>{email.timestamp}</span></div>
            <p className="text-sm font-medium">{email.subject}</p>
            <p className="text-xs text-slate-600">{email.preview}</p>
            <div className="flex items-center gap-1">
              {email.badges.map((b) => <Badge key={b}>{b}</Badge>)}
              {reviewed.includes(email.id) && <Badge className="bg-emerald-100 text-emerald-700">Reviewed</Badge>}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
