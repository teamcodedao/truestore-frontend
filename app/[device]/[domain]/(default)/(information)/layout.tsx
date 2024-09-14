import {Suspense} from 'react';

import {TrackPageView} from '@/components/common';

export const dynamic = 'error';

export default function InformationLayout({children}: LayoutProps) {
  return (
    <>
      <div className="mt-5">{children}</div>
      <Suspense>
        <TrackPageView />
      </Suspense>
    </>
  );
}
