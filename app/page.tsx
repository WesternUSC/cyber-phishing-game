'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { ModeCard } from '@/components/mode-card';
import { InboxList } from '@/components/inbox-list';
import { EmailViewer } from '@/components/email-viewer';
import { DecisionPanel } from '@/components/decision-panel';
import { LevelProgress } from '@/components/level-progress';
import { FeedbackModal } from '@/components/feedback-modal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { emails, levelConfig } from '@/data/emails';
import { gameReducer, initialGameState } from '@/lib/game';

const STORAGE_KEY = 'phishquest-run';

export default function HomePage() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [nameInput, setNameInput] = useState('');
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [feedback, setFeedback] = useState<{ open: boolean; correct: boolean; explanation: string; evidence: string[] }>({ open: false, correct: false, explanation: '', evidence: [] });
  const openedAtRef = useRef<number>(Date.now());
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      dispatch({ type: 'HYDRATE', state: parsed });
      setShowNameDialog(!parsed.started);
    }
  }, []);

  useEffect(() => {
    if (state.started) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const levelEmails = useMemo(() => emails.filter((e) => e.level === 1), []);
  const current = levelEmails.find((e) => e.id === state.currentEmailId);

  const start = () => {
    const runId = crypto.randomUUID();
    dispatch({ type: 'START', name: nameInput || 'Analyst', firstEmailId: levelEmails[0].id, runId });
    setShowNameDialog(false);
    openedAtRef.current = Date.now();
  };

  const onSelectEmail = (id: string) => {
    dispatch({ type: 'OPEN_EMAIL', emailId: id });
    openedAtRef.current = Date.now();
  };

  const onSubmit = (decision: 'phish' | 'safe', reasons: string[]) => {
    if (!current) return;
    const correct = current.truth === decision;
    const ms = Date.now() - openedAtRef.current;
    dispatch({ type: 'SUBMIT_DECISION', payload: { emailId: current.id, decision, reasons, correct, ms } });
    setFeedback({ open: true, correct, explanation: current.explanation, evidence: current.evidence });
  };

  useEffect(() => {
    if (state.started && state.reviewed.length === levelEmails.length) {
      router.push(`/results/${state.runId}`);
    }
  }, [state.reviewed.length, state.runId, state.started, levelEmails.length, router]);

  const content = (
    <>
      <ModeCard />
      <LevelProgress reviewed={state.reviewed.length} total={levelEmails.length} />
      <div className="hidden gap-4 lg:grid lg:grid-cols-12">
        <div className="col-span-3"><InboxList emails={levelEmails} selectedId={state.currentEmailId} reviewed={state.reviewed} onSelect={onSelectEmail} /></div>
        <div className="col-span-6"><EmailViewer email={current} /></div>
        <div className="col-span-3"><DecisionPanel email={current} requireReason={levelConfig[1].requireReason} onSubmit={onSubmit} /></div>
      </div>
      <div className="lg:hidden">
        <Tabs defaultValue="inbox">
          <TabsList className="mb-3 w-full"><TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger><TabsTrigger value="email" className="flex-1">Email</TabsTrigger><TabsTrigger value="decide" className="flex-1">Decide</TabsTrigger></TabsList>
          <TabsContent value="inbox"><InboxList emails={levelEmails} selectedId={state.currentEmailId} reviewed={state.reviewed} onSelect={onSelectEmail} /></TabsContent>
          <TabsContent value="email"><EmailViewer email={current} /></TabsContent>
          <TabsContent value="decide"><DecisionPanel email={current} requireReason={levelConfig[1].requireReason} onSubmit={onSubmit} /></TabsContent>
        </Tabs>
      </div>
    </>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand/10 to-transparent p-4">
      <div className="mx-auto max-w-7xl space-y-4">
        <AppShell playerName={state.playerName} />
        {content}
      </div>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogTitle>Welcome to PhishQuest</DialogTitle>
          <p className="mt-2 text-sm text-slate-600">Enter your name to open your inbox.</p>
          <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Your name" className="mt-3 w-full rounded border p-2" />
          <Button className="mt-4 w-full" onClick={start}>Start Training</Button>
        </DialogContent>
      </Dialog>
      <FeedbackModal open={feedback.open} onOpenChange={(open) => setFeedback((s) => ({ ...s, open }))} correct={feedback.correct} explanation={feedback.explanation} evidence={feedback.evidence} />
    </main>
  );
}
