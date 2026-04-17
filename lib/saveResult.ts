import { GameState, Decision, Email } from './types';

export interface AnswerRecord {
  emailId: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  truth: 'phish' | 'safe';
  decision: 'phish' | 'safe';
  correct: boolean;
  timeMs: number;
}

// One persistent sessionId per browser — tracks repeat plays without a login
function getSessionId(): string {
  const key = 'phishquest-session';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function saveResult(state: GameState, emails: Email[]): Promise<void> {
  // Dynamic import keeps Firebase out of the initial bundle entirely
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
  const { db } = await import('./firebase');

  const answers: AnswerRecord[] = emails
    .filter((e) => state.decisions[e.id])
    .map((e) => {
      const d: Decision = state.decisions[e.id];
      return {
        emailId: e.id,
        subject: e.subject,
        senderName: e.senderName,
        senderEmail: e.senderEmail,
        truth: e.truth,
        decision: d.decision,
        correct: d.correct,
        timeMs: d.ms,
      };
    });

  const score = answers.filter((a) => a.correct).length;

  await addDoc(collection(db, 'results'), {
    name: state.playerName,
    sessionId: getSessionId(),
    score,
    totalEmails: emails.length,
    accuracyPct: Math.round((score / emails.length) * 100),
    answers,
    completedAt: serverTimestamp(),
  });
}
