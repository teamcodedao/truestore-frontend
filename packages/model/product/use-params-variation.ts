'use client';

import {useMemo} from 'react';
import {useSearchParams} from 'next/navigation';

import superjson from 'superjson';

export function useParamsVariation<T = Record<string, string>>() {
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
