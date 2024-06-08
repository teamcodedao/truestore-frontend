import {useEffect, useState} from 'react';

import {getCookie} from 'react-use-cookie';

type Device = 'mobile' | 'table' | 'desktop';

export function useDevice(initialDevice?: Device) {
  const [device, setDevice] = useState<Device>(initialDevice ?? 'desktop');

  useEffect(() => {
    setDevice(getCookie('device') as Device);
  }, []);

  return device;
}
