'use client';

import {useEffect} from 'react';
import Script from 'next/script';

import {Fbpixel} from './fbpixel';

export const fbpixel = new Fbpixel();

interface FbpixelProps {
  pixel_ids: string[];
}

export default function FbpixelProvider({pixel_ids}: FbpixelProps) {
  useEffect(() => {
    const handler = () => {
      fbpixel.initialize(pixel_ids);
    };
    if (document.readyState === 'complete') {
      handler();
    } else {
      window.addEventListener('load', handler, {once: true});
      return () => document.removeEventListener('load', handler);
    }
  }, [pixel_ids]);

  if (pixel_ids.length === 0) {
    return null;
  }

  return (
    <Script id="fbpixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        ${pixel_ids.map(id => `fbq('init', ${id});`).join('\n')}
        `}
    </Script>
  );
}
