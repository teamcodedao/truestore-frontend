'use client';

import {Suspense, useMemo} from 'react';
import {type Route} from 'next';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import superjson from 'superjson';
import type {Except} from 'type-fest';

import {useParamsVariation} from '@model/product';

import {
  ProductAttributeProps,
  ProductAttribute as ImplProductAttribute,
} from './product-attribute';

function ProductAttribute(
  props: Except<ProductAttributeProps, 'selectedIndex' | 'onSelect'>
) {
  const router = useRouter();
  const pathname = usePathname();

  const variation = useParamsVariation<Record<string, string>>();

  const selectedIndex = useMemo(() => {
    return (
      props.options.findIndex(option => option === variation?.[props.name]) ??
      -1
    );
  }, [props.name, props.options, variation]);

  const handleSelect = (value: string) => {
    const json = {...variation, [props.name]: value};
    router.push(
      `${pathname}?variation=${encodeURIComponent(
        superjson.stringify(json)
      )}` as Route,
      {
        scroll: false,
      }
    );
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
