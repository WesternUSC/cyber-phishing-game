'use client';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { reasonOptions, type EmailScenario } from '@/data/emails';

export function DecisionPanel({ email, requireReason, onSubmit }: { email?: EmailScenario; requireReason: boolean; onSubmit: (decision: 'phish' | 'safe', reasons: string[]) => void }) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const disabled = !email || (requireReason && selectedReasons.length === 0);

  const helper = useMemo(() => requireReason ? 'Reason required for this level.' : 'Reason optional for this level.', [requireReason]);

  const toggle = (reason: string) => setSelectedReasons((prev) => prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]);

  return (
    <Card>
      <CardHeader><CardTitle>Decide</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button className="h-14" disabled={disabled} onClick={() => onSubmit('phish', selectedReasons)}>Report Phishing</Button>
          <Button variant="outline" className="h-14" disabled={disabled} onClick={() => onSubmit('safe', selectedReasons)}>Mark Safe</Button>
        </div>
        <p className="text-xs text-slate-600">{helper}</p>
        <div className="flex flex-wrap gap-2">
          {reasonOptions.map((reason) => (
            <button key={reason} onClick={() => toggle(reason)} className={`rounded-full border px-3 py-1 text-xs transition ${selectedReasons.includes(reason) ? 'border-brand bg-brand text-white' : 'bg-white hover:border-brand'}`}>
              {reason}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
