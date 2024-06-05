'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {Toaster} from 'sonner';

import {trackingInitialize} from '@tracking/data';
import backdrop, {Backdropper} from '@ui/backdrop';
import offcanvas, {Offcanvaser} from '@ui/offcanvas';

export default function Provider({children}: React.PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    backdrop.close();
    offcanvas.close();
  }, [pathname]);

  useEffect(() => {
    trackingInitialize();
  }, []);

  return (
    <>
      {children}
      <Offcanvaser />
      <Backdropper />
      <Toaster richColors position='top-center' />
    </>
  );
}
