'use client';

import {useMemo} from 'react';
import Link from 'next/link';

import * as R from 'remeda';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {MenuOffcanvas} from '@/components/ui';
import {useDevice} from '@/lib/use-device';
import {NoSSR} from '@common/no-ssr';
import {useCart} from '@model/cart';
import offcanvas from '@ui/offcanvas';

interface ForestHeaderProps {
  domain: string;
}

export default function ForestHeader({domain}: ForestHeaderProps) {
  const device = useDevice();

  const shopName = useMemo(() => {
    return R.pipe(domain, R.split('.'), R.takeLast(2), R.first()) ?? 'Shop';
  }, [domain]);

  const [{countTotal}] = useCart();

  return (
    <header className="border-b border-gray-200">
      <div className="container flex justify-between gap-10 py-4 lg:py-7">
        <MenuOffcanvas className="min-[590px]:hidden" />
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-extrabold first-letter:uppercase"
          >
            <h1>{shopName}</h1>
          </Link>
          <menu className="flex gap-6 text-sm font-normal max-[590px]:hidden [&_a:hover]:underline">
            <li>
              <Link href="/order-tracking">Order Tracking</Link>
            </li>
            <li>
              <Link href="/refund_returns">Return & Refund Policy</Link>
            </li>
            <li>
              <Link href="/contact">FAQs</Link>
            </li>
          </menu>
        </div>
        <div>
          <button
            aria-label="Cart"
            className="relative"
            onClick={() => {
              offcanvas.show({
                direction: 'right',
                ssr: false,
                fallback: <CheckoutCartError onClose={offcanvas.close} />,
                content: <CheckoutCart onClose={offcanvas.close} />,
              });
            }}
          >
            <span className="i-carbon-shopping-bag text-3xl"></span>
            <NoSSR>
              <span className="absolute -right-1 bottom-1 aspect-square size-4 rounded-full bg-black text-[11px] font-medium text-white">
                {countTotal > 99 && device === 'mobile' ? '99+' : countTotal}
              </span>
            </NoSSR>
          </button>
        </div>
      </div>
    </header>
  );
}
