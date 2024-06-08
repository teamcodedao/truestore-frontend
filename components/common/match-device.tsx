'use client';

import {isValidElement} from 'react';

import clsx from 'clsx';

import {useDevice} from '@/lib/use-device';
import {useMounted} from '@/lib/use-mounted';

interface MatchDeviceProps extends React.PropsWithChildren {
  show?: boolean;
  devices: ReturnType<typeof useDevice>[];
}

export default function MatchDevice({
  children,
  show = true,
  devices,
}: MatchDeviceProps) {
  const isMounted = useMounted();
  const device = useDevice();

  const isMatch = devices.length > 0 && devices.includes(device);

  const enhanceChildren = isValidElement(children) ? (
    children
  ) : (
    <div
      className={clsx('transition', {
        'opacity-0': !isMounted,
      })}
    >
      {children}
    </div>
  );

  if (show) {
    if (isMatch) {
      return <>{enhanceChildren}</>;
    }
    return null;
  }

  if (isMatch) {
    return null;
  }
  return <>{enhanceChildren}</>;
}
