'use client';

import Script from 'next/script';

import {getCurrentEventInfo} from './utils';

interface FbpixelProps {
  ids?: string;
}

export default function Fbpixel({ids}: FbpixelProps) {
  if (!ids) {
    return null;
  }

  const eventInfo = getCurrentEventInfo();

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
        ${ids
          .split('|')
          .map(id => `fbq('init', ${id});`)
          .join('\n')}
          fbq('track', 'PageView', {
            event_day: '${eventInfo.event_day}',
            event_month: '${eventInfo.event_month}',
            event_time: '${eventInfo.event_time}',
            event_url: '${eventInfo.event_url}'
          });`}
    </Script>
  );
}
