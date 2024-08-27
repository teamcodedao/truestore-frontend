'use client';

import {useEffect} from 'react';
import Script from 'next/script';

import {TiktokPixel} from './tiktokpixel';

export const tiktokPixel = new TiktokPixel();

interface TiktokPixelProps {
  pixel_ids: string[];
}

export default function TiktokPixelProvider({pixel_ids}: TiktokPixelProps) {
  useEffect(() => {
    const handler = () => {
      tiktokPixel.initialize(pixel_ids);
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
    <Script id="tiktokpixel" strategy="afterInteractive">
      {`!function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
        ${pixel_ids.map(id => `ttq.load('${id}');`).join('\n')}
        ${pixel_ids.map(() => `ttq.page();`).join('\n')}
      }`}
    </Script>
  );
}
