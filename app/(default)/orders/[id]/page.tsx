import {Suspense} from 'react';
import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';
import {OrderDetails} from '@/components/order';
import {retrieveOrder} from '@model/order';

export const metadata: Metadata = {
  title: 'Order Received',
  robots: 'noindex',
};

export default function OrderReceivedPage({
  params,
  searchParams,
}: PageProps<{id: string}, {key: string}>) {
  const id = params.id;
  const key = searchParams.key;

  if (!key) {
    notFound();
  }

  const retrieveOrderPromise = retrieveOrder(id, key, {throwNotFound: true});

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
