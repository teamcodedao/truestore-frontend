import {Suspense} from 'react';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';

import FormHandler from './form-handler';

export const metadata: Metadata = {
  title: 'Order Tracking',
};

export default function OrderTrackingPage() {
  return (
    <>
      <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        Order Tracking
      </h1>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <FormHandler />
        <p className='mt-10 text-center text-sm text-gray-500'>
          Don&apos;t see an order number.{' '}
          <a
            href='#'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            How to find?
          </a>
        </p>
      </div>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
