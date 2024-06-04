'use client';

import {Provider} from './platform-context';
import type {PublicPlatformConfig} from './typings';

export default function PlatformProvider({
  children,
  initialState,
}: React.PropsWithChildren<{initialState: PublicPlatformConfig}>) {
  return <Provider initialState={initialState}>{children}</Provider>;
}
