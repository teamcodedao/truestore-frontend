'use client';

import {useMemo} from 'react';

import superjson from 'superjson';

import {useSearchParams} from '@/lib/use-search-params';

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
