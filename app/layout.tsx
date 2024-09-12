import './globals.css';
import './bootstrap';
import {Inter, Poppins} from 'next/font/google';

import {cn} from '@/lib/cn';

import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
});

const poppinsFont = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--poppins-font',
});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, poppinsFont.variable, 'antialiased')}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
