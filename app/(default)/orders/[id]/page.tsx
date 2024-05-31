import {Suspense} from 'react';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';

export const metadata: Metadata = {
  title: 'Order Received',
};

export default function OrderReceivedPage() {
  return (
    <>
      <article className='prose lg:prose-lg'>
        <h2>Order Tracking</h2>
        <p>COMING SOON</p>
      </article>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
