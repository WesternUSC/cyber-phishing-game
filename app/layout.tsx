import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PhishQuest',
  description: 'Interactive phishing email training game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
