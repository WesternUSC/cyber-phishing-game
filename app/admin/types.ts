export type AnswerRecord = {
  correct: boolean;
  decision: "phish" | "safe";
  emailId: string;
  senderEmail?: string;
  senderName?: string;
  subject?: string;
  timeMs?: number;
  truth: "phish" | "safe";
};

export type GameResult = {
  id: string;
  name?: string;
  sessionId: string;
  score: number;
  totalEmails: number;
  accuracyPct?: number;
  completedAt?: Date | null;
  answers: AnswerRecord[];
};