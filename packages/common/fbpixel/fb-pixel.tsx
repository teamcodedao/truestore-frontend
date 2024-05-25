'use client';

import {useEffect, useState} from 'react';
import Script from 'next/script';

import {Fbpixel} from './fbpixel';

export const fbpixel = new Fbpixel();

export default function FbpixelProvider() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const handler = async () => {
      const ids = await fbpixel.initialize();
      setIds(ids);
    };
    if (document.readyState === 'complete') {
      handler();
    } else {
      window.addEventListener('load', handler, {once: true});
      return () => document.removeEventListener('load', handler);
    }
  }, []);

  if (ids.length === 0) {
    return null;
  }

  return (
    <Script id='fbpixel' strategy='afterInteractive'>
      {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        ${ids.map(id => `fbq('init', ${id});`).join('\n')}
        `}
    </Script>
  );
}
