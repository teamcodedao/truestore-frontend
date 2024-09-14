import './globals.css';
import './bootstrap';
import {Inter, Poppins} from 'next/font/google';
import localFont from 'next/font/local';

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

const harmoniaFont = localFont({
  src: '../assets/fonts/Harmonia-Sans-Regular.otf',
  variable: '--harmonia-font',
});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          poppinsFont.variable,
          harmoniaFont.variable,
          'antialiased',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
