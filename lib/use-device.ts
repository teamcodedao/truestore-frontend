'use client';

import {useParams} from 'next/navigation';

export function useDevice() {
  const {device} = useParams<{device: Device}>();
  return device;
}
