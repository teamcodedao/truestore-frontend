'use client';

import {Backdropper} from '@ui/backdrop';
import {Offcanvaser} from '@ui/offcanvas';

export default function Provider({children}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Offcanvaser />
      <Backdropper />
    </>
  );
}
