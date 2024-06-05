'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {Toaster} from 'sonner';

import {
  PlatformProvider as BasePlatformProvider,
  type PublicPlatformConfig,
} from '@common/platform';
import {trackingInitialize} from '@tracking/data';
import {Fbpixel} from '@tracking/fbpixel';
import backdrop, {Backdropper} from '@ui/backdrop';
import offcanvas, {Offcanvaser} from '@ui/offcanvas';

interface PlatformProviderProps extends PublicPlatformConfig {}

export default function PlatformProvider({
  children,
  ...platformRest
}: React.PropsWithChildren<PlatformProviderProps>) {
  const pathname = usePathname();

  useEffect(() => {
    backdrop.close();
    offcanvas.close();
  }, [pathname]);

  useEffect(() => {
    trackingInitialize();
  }, []);

  return (
    <BasePlatformProvider initialState={platformRest}>
      {children}
      <Offcanvaser />
      <Backdropper />
      <Toaster richColors position='top-center' />
      <Fbpixel pixel_ids={platformRest.pixel_ids} />
    </BasePlatformProvider>
  );
}
