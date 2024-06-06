import {Suspense} from 'react';

import {TrackPageView} from '@/components/common';

export const dynamic = 'error';

export default function InformationLayout({children}: LayoutProps) {
  return (
    <>
      {children}
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
