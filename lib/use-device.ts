'use client';

import {useParams} from 'next/navigation';

type Device = 'mobile' | 'table' | 'desktop';

export function useDevice() {
  const {device} = useParams<{device: Device}>();
  return device;
}
