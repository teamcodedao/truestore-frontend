'use client';

import {useDevice} from '@/lib/use-device';

interface MatchDeviceProps extends React.PropsWithChildren {
  show?: boolean;
  devices: ReturnType<typeof useDevice>[];
}

export default function MatchDevice({
  children,
  show = true,
  devices,
}: MatchDeviceProps) {
  const device = useDevice();

  const isMatch = devices.length > 0 && devices.includes(device);

  if (show) {
    if (isMatch) {
      return <>{children}</>;
    }
    return null;
  }

  if (isMatch) {
    return null;
  }
  return <>{children}</>;
}
