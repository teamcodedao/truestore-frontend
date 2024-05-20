'use client';

import {useState} from 'react';

import useBaseCookie, {getCookie} from 'react-use-cookie';
import {useIntervalWhen} from 'rooks';

export function useCookie<V = unknown>(name: string, initialValue: V) {
  const [, set, remove] = useBaseCookie(name);
  const [value, setValue] = useState<V>(() => get());

  useIntervalWhen(
    () => {
      setValue(get());
    },
    1000,
    true
  );

  function get() {
    try {
      return JSON.parse(getCookie(name)) as V;
    } catch {
      return initialValue;
    }
  }

  return [value, {set, remove}] as const;
}
