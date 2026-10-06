import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/components/app-context';

export const metadata: Metadata = {
  title: 'PhishQuest',
  description: 'Interactive phishing email training game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
