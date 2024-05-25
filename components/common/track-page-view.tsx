'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {fbpixel} from '@common/fbpixel';

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    fbpixel.trackPageView();
  }, [pathname]);

  return null;
}
