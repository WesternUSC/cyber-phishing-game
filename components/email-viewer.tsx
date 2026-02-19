'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Paperclip } from 'lucide-react';
import { EmailScenario } from '@/data/emails';

export function EmailViewer({ email }: { email?: EmailScenario }) {
  if (!email) return <Card><CardContent className="pt-4 text-sm text-slate-500">Select an email to inspect.</CardContent></Card>;

  return (
    <Card className="transition hover:shadow-lift">
      <CardHeader>
        <CardTitle>{email.subject}</CardTitle>
        <p className="text-sm text-slate-600">From: {email.senderName} &lt;<span className="mono">{email.senderEmail}</span>&gt;</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p>{email.bodyText}</p>
        {email.links.length > 0 && (
          <TooltipProvider>
            <div className="space-y-2">
              {email.links.map((link) => (
                <Tooltip key={link.label}>
                  <TooltipTrigger asChild>
                    <a href="#" onClick={(e) => e.preventDefault()} className="block text-brand underline mono">{link.label} ({link.displayUrl})</a>
                  </TooltipTrigger>
                  <TooltipContent>Actual URL: {link.actualUrl}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        )}
        {email.attachments.length > 0 && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase text-slate-500">Attachments</p>
            {email.attachments.map((a) => <div key={a.filename} className="flex items-center gap-2 rounded bg-[hsl(var(--muted))] p-2"><Paperclip className="h-4 w-4" />{a.filename} ({a.type})</div>)}
          </div>
        )}
        <Separator />
        <details className="rounded bg-[hsl(var(--muted))] p-2">
          <summary className="cursor-pointer text-xs font-semibold">View raw headers</summary>
          <pre className="mono mt-2 whitespace-pre-wrap text-xs">{email.rawHeaders}</pre>
        </details>
      </CardContent>
    </Card>
  );
}
