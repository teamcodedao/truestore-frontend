import {Suspense} from 'react';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';
import {OrderDetails} from '@/components/order';

export const metadata: Metadata = {
  title: 'Order Received',
  robots: 'noindex',
};

export default function OrderReceivedPage() {
  return (
    <>
      <div className=''>
        <OrderDetails />
      </div>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
