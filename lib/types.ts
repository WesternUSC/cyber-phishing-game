export interface EmailLink {
  label: string;
  displayUrl: string;
  actualUrl: string;
  isSuspicious: boolean;
}

export interface EmailAttachment {
  filename: string;
  type: string;
  isSuspicious: boolean;
}

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: string;
  time: string;
  bodyHtml: string;
  links: EmailLink[];
  attachments: EmailAttachment[];
  badges: string[];
  truth: 'phish' | 'safe';
  explanation: string;
  evidence: string[];
  rawHeaders?: string;
}

export interface Decision {
  decision: 'phish' | 'safe';
  correct: boolean;
  ms: number;
}

export interface GameState {
  playerName: string;
  started: boolean;
  runId: string;
  currentEmailId: string | null;
  reviewed: string[];
  decisions: Record<string, Decision>;
}

export type GameAction =
  | { type: 'START'; name: string; firstEmailId: string; runId: string }
  | { type: 'HYDRATE'; state: GameState }
  | { type: 'OPEN_EMAIL'; emailId: string }
  | { type: 'SUBMIT_DECISION'; payload: { emailId: string; decision: 'phish' | 'safe'; correct: boolean; ms: number } };
