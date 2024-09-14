import {Suspense, useMemo} from 'react';
import lazy from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import type {Metadata} from 'next';
import * as R from 'remeda';

import logoImg from '@/assets/images/logo_home_page.png';
import trustbadge from '@/assets/images/trustbadge.png';
import {
  CheckoutHeading,
  CheckoutInformationSkeleton,
  CheckoutPayment,
  CheckoutTracking,
} from '@/components/checkout';
import {TrackPageView} from '@/components/common';
import {MenuOffcanvas} from '@/components/ui';

const CheckoutInformation = lazy(
  () => import('@/components/checkout').then(mod => mod.CheckoutInformation),
  {
    ssr: false,
    loading: () => (
      <div className="w-[--w-base] max-w-full">
        <CheckoutInformationSkeleton />
      </div>
    ),
  },
);

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: 'noindex',
};

export default function CheckoutPage({params}: PageProps) {
  const domain = params.domain;

  const shopName = useMemo(() => {
    return R.pipe(domain, R.split('.'), R.takeLast(2), R.first()) ?? 'Shop';
  }, [domain]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col [--max-w:100%] [--w-base:550px] sm:multi-[`[--max-w:min(100%,var(--w-base))];flex-row;`]">
        <div className="flex grow justify-end overflow-hidden bg-gray-50 px-5 pb-10 sm:flex-1 lg:px-8">
          <div className="max-w-[--max-w]">
            <div>
              <MenuOffcanvas className="my-5 sm:mb-10" />
              <span className="ml-2 hidden translate-y-[-7px] text-3xl font-extrabold first-letter:uppercase forest:inline-block">
                {shopName}
              </span>
            </div>
            <CheckoutHeading />
            <div className="h-4"></div>
            <CheckoutInformation />
          </div>
        </div>

        <div className="grow px-5 pb-12 pt-5 sm:flex-1 lg:px-8">
          <div className="hidden forest:hidden sm:block">
            <Link href="/">
              <Image src={logoImg} quality={100} priority alt="" />
            </Link>
          </div>
          <div className="mt-10 max-w-[--max-w]">
            <CheckoutPayment />
            <hr />
            <div className="mt-4 flex flex-col items-center gap-4 text-center">
              <p className="font-medium">
                All transactions are secure and encrypted by
              </p>
              <Image src={trustbadge} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <TrackPageView />
        <CheckoutTracking />
      </Suspense>
    </>
  );
}
