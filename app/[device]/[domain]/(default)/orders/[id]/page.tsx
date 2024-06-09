import {Suspense} from 'react';
import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

import {TrackPageView} from '@/components/common';
import {OrderDetails} from '@/components/order';
import {OrderDetailPageSkeleton} from '@/components/skeleton';
import {retrieveOrder} from '@model/order/ssr';

export const metadata: Metadata = {
  title: 'Order Received',
  robots: 'noindex',
};

export default function OrderPage({
  params,
  searchParams,
}: PageProps<{id: string}, {key: string}>) {
  const domain = params.domain;
  const id = params.id;
  const key = searchParams.key;

  if (!key) {
    notFound();
  }

  const retrieveOrderPromise = retrieveOrder(domain, id, key, {
    throwNotFound: true,
  });

  return (
    <>
      <Suspense fallback={<OrderDetailPageSkeleton className="mt-10" />}>
        <OrderDetails retrieveOrderPromise={retrieveOrderPromise} />
      </Suspense>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
