import {Suspense} from 'react';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';

import FormHandler from './form-handler';
import HowToFind from './how-to-find';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Order Tracking',
};

export default function OrderTrackingPage() {
  return (
    <>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 forest:font-poppins">
        Order Tracking
      </h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormHandler />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t see an order number. <HowToFind />
        </p>
      </div>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
