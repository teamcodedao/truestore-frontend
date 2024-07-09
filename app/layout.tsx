import './globals.css';
import './bootstrap';
import {Inter} from 'next/font/google';

import {cn} from '@/lib/cn';

import Providers from './providers';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
