import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/components/app-context';
import { DebugTab } from '@/components/debug-component';
import { CornerTab } from '@/components/corner-tab';
import AccessibilityWidget from '@/components/accessibility-widget';
import PageMagnifier from '@/components/page-magnifier';
import { ZoomProvider } from '@/components/zoom-context';
import HelpChat from '@/components/help-chat';

export const metadata: Metadata = {
  title: 'USC Onboarding',
  description: 'Onboarding for the USC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ZoomProvider>
            <PageMagnifier>
            {children}
            </PageMagnifier>
          <CornerTab />
          <AccessibilityWidget />
          <HelpChat
          iconSrc="usc-logo-help-icon.png"
          recipientEmail={""}
          />
          <DebugTab />
          </ZoomProvider>
        </AppProvider>
      </body>
    </html>
  );
}
