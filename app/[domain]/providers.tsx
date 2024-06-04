'use client';

import {PlatformProvider, type PublicPlatformConfig} from '@common/platform';
import {Fbpixel} from '@tracking/fbpixel';

interface MasterPlatformProviderProps extends PublicPlatformConfig {}

export default function MasterPlatformProvider({
  children,
  ...platformRest
}: React.PropsWithChildren<MasterPlatformProviderProps>) {
  return (
    <PlatformProvider initialState={platformRest}>
      {children}
      <Fbpixel pixel_ids={platformRest.pixel_ids} />
    </PlatformProvider>
  );
}
