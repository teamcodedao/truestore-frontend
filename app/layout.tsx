import './globals.css';
import {Inter} from 'next/font/google';

import clsx from 'clsx';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}
