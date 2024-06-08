'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import paypalImg from '@/images/payments/paypal.webp';
import visaMasterImg from '@/images/payments/visa_master.webp';
import {usePlatform} from '@common/platform';

interface FooterProps extends React.ComponentProps<'footer'> {}

export default function Footer({className}: FooterProps) {
  const platform = usePlatform();

  return (
    <footer className={clsx(className, 'bg-[#042449] text-white')}>
      <div className="container">
        <footer className="flex flex-col gap-x-10 gap-y-20 py-14 md:flex-row lg:gap-x-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{platform.company}</h2>
            <address className="mt-8 space-y-4 text-sm font-semibold text-gray-300">
              <p>
                Address: <span className="text-white">{platform.address}</span>
              </p>
              <a
                href={`mailto:${platform.email}`}
                className="block font-semibold text-white hover:text-slate-200"
              >
                {platform.email}
              </a>
            </address>
            <div className="mt-10 flex justify-center gap-x-2 *:multi-[`object-contain`]">
              <Image src={paypalImg} alt="" height={50} />
              <Image src={visaMasterImg} alt="" height={50} />
            </div>
          </div>
          <div
            className={clsx(
              'flex grow justify-center gap-x-10 sm:gap-x-20 md:gap-x-8 lg:gap-x-20 xl:gap-x-40',
              'mixin/heading:multi-[`font-bold;text-sm`]',
              'mixin/menu:multi-[`text-sm;mt-4;[&_a:hover]:text-slate-200`]',
            )}
          >
            <div>
              <h3 className="mixin/heading">Order</h3>
              <ul className="mixin/menu">
                <li>
                  <Link href="/order-tracking">Order Tracking</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/refund_returns">Return & Refund Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mixin/heading">Resources</h3>
              <ul className="mixin/menu">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/payment-methods">Payment Methods</Link>
                </li>
                <li>
                  <Link href="/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}
