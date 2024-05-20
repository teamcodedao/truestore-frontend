'use client';

import {startTransition, Suspense, useMemo, useOptimistic} from 'react';
import {type Route} from 'next';
import {usePathname, useRouter} from 'next/navigation';

import superjson from 'superjson';
import type {Except} from 'type-fest';

import {useParamsVariation} from '@model/product';

import {
  ProductAttribute as ImplProductAttribute,
  ProductAttributeProps,
} from './product-attribute';

function ProductAttribute(
  props: Except<ProductAttributeProps, 'selectedIndex' | 'onSelect'>
) {
  const router = useRouter();
  const pathname = usePathname();

  const [variation, addOptimistic] = useOptimistic(
    useParamsVariation<Record<string, string>>(),
    (_state, value: Record<string, string>) => value
  );

  const selectedIndex = useMemo(() => {
    return props.options.findIndex(
      option => option === variation?.[props.name]
    );
  }, [props.name, props.options, variation]);

  const handleSelect = (value: string) => {
    const json = {...variation, [props.name]: value};
    startTransition(() => {
      addOptimistic(json);
      router.replace(
        `${pathname}?variation=${encodeURIComponent(
          superjson.stringify(json)
        )}` as Route,
        {
          scroll: false,
        }
      );
    });
  };

  return (
    <ImplProductAttribute
      {...props}
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
    />
  );
}

export default function SuspenseProductAttribute(
  props: Except<ProductAttributeProps, 'selectedIndex' | 'onSelect'>
) {
  if (props.options.length === 0) return null;
  return (
    <Suspense fallback={<ImplProductAttribute {...props} />}>
      <ProductAttribute {...props} />
    </Suspense>
  );
}
