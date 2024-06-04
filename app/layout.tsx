import './globals.css';
import {Inter} from 'next/font/google';

import clsx from 'clsx';

import Providers from './providers';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
