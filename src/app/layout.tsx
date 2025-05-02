import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Keep Geist fonts
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BotLife - AI Minecraft Society', // Updated Title
  description: 'Simulating an autonomous AI bot society in Minecraft.', // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased font-sans` // Apply Geist Sans as default
        )}
      >
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
