import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ColorProvider } from '@/providers/ColorProvider';
import { AppShell } from '@/components/shell/AppShell';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'khaaliColors',
  description: 'OKLCH Color System Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <ColorProvider>
          <AppShell>{children}</AppShell>
        </ColorProvider>
      </body>
    </html>
  );
}
