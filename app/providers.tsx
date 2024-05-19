'use client';

import {Offcanvaser} from '@ui/offcanvas';

export default function Provider({children}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Offcanvaser />
    </>
  );
}
