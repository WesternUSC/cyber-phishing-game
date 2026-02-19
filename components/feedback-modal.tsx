'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function FeedbackModal({ open, onOpenChange, correct, explanation, evidence }: { open: boolean; onOpenChange: (open: boolean) => void; correct: boolean; explanation: string; evidence: string[] }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className={correct ? 'text-emerald-600' : 'text-red-600'}>{correct ? 'Correct!' : 'Not quite'}</DialogTitle>
        <p className="mt-2 text-sm">{explanation}</p>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">{evidence.map((item) => <li key={item}>{item}</li>)}</ul>
        <Button className="mt-4 w-full" onClick={() => onOpenChange(false)}>Continue</Button>
      </DialogContent>
    </Dialog>
  );
}