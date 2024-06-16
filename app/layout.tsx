import './globals.css';
import {Inter} from 'next/font/google';

import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: LayoutProps & {domain: never}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}
