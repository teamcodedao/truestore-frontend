import {useMemo} from 'react';
import {useSearchParams} from 'next/navigation';

import superjson from 'superjson';

import type {GetParamsVariation} from './typings';

export function useParamsVariation<T = GetParamsVariation>() {
  const searchParams = useSearchParams();
  const rawVariation = searchParams.get('variation') ?? '';

  return useMemo(() => {
    try {
      return superjson.parse<T>(rawVariation);
    } catch {
      return null;
    }
  }, [rawVariation]);
}
