'use client';

import {useEffect} from 'react';
import Script from 'next/script';

import {SnapPixel} from './snappixel';

export const snapPixel = new SnapPixel();

interface SnapPixelProps {
  pixel_ids: string[];
}

export default function SnapPixelProvider({pixel_ids}: SnapPixelProps) {
  useEffect(() => {
    const handler = () => {
      snapPixel.initialize(pixel_ids);
    };
    if (document.readyState === 'complete') {
      handler();
    } else {
      window.addEventListener('load', handler, {once: true});
      return () => window.removeEventListener('load', handler);
    }
  }, [pixel_ids]);

  if (pixel_ids.length === 0) {
    return null;
  }

  const snapPixelScript = `
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
    r.src=n;var u=t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r,u);})(window,document,
    'https://sc-static.net/scevent.min.js');

    ${pixel_ids.map(id => `snaptr('init', '${id}', {});`).join('\n')}
    snaptr('track', 'PAGE_VIEW');
  `;

  return (
    <Script id="snappixel" strategy="afterInteractive">
      {snapPixelScript}
    </Script>
  );
}
