import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import clsx from 'clsx';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE),
  title: 'Demo Trustore',
  description: 'Demo Trustore',
};

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}
