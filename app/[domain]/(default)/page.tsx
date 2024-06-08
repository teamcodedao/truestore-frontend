import {Suspense} from 'react';

import {TrackPageView} from '@/components/common';

export default function Home() {
  return (
    <>
      <main></main>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
