import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/components/app-context';
import { DebugTab } from '@/components/debug-component';
import { CornerTab } from '@/components/corner-tab';

export const metadata: Metadata = {
  title: 'USC Onboarding',
  description: 'Onboarding for the USC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <CornerTab />
          <DebugTab />
        </AppProvider>
      </body>
    </html>
  );
}
