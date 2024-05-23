import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import paypalImg from '@/images/payments/paypal.webp';
import visaMasterImg from '@/images/payments/visa_master.webp';

interface FooterProps extends React.ComponentProps<'footer'> {}

export default function Footer({className}: FooterProps) {
  return (
    <footer className={clsx(className, 'bg-[#042449] text-white')}>
      <div className='container'>
        <footer className='flex flex-col gap-x-10 gap-y-20 py-14 md:flex-row lg:gap-x-20'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>CuTeng Queue Pte. Ltd</h2>
            <address className='mt-8 space-y-4 text-sm font-semibold text-gray-300'>
              <p>
                Address:{' '}
                <span className='text-white'>
                  244 Fast North Drive 1, #02-05, Singapore, 528559
                </span>
              </p>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className='block font-semibold text-white hover:text-slate-200'
              >
                {process.env.NEXT_PUBLIC_EMAIL}
              </a>
            </address>
            <div className='mt-10 flex justify-center gap-x-2 *:multi-[`object-contain`]'>
              <Image src={paypalImg} alt='' height={50} />
              <Image src={visaMasterImg} alt='' height={50} />
            </div>
          </div>
          <div
            className={clsx(
              'flex grow justify-center gap-x-10 sm:gap-x-20 md:gap-x-8 lg:gap-x-20 xl:gap-x-40',
              'mixin/heading:multi-[`font-bold;text-sm`]',
              'mixin/menu:multi-[`text-sm;mt-4;[&_a:hover]:text-slate-200`]'
            )}
          >
            <div>
              <h3 className='mixin/heading'>Order</h3>
              <ul className='mixin/menu'>
                <li>
                  <Link href='/order-tracking'>Order Tracking</Link>
                </li>
                <li>
                  <a href='/shipping-policy'>Shipping Policy</a>
                </li>
                <li>
                  <a href='/refund_returns'>Return & Refund Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mixin/heading'>Resources</h3>
              <ul className='mixin/menu'>
                <li>
                  <Link href='/about-us'>About Us</Link>
                </li>
                <li>
                  <Link href='/contact'>Contact Us</Link>
                </li>
                <li>
                  <a href='/payment-methods'>Payment Methods</a>
                </li>
                <li>
                  <a href='/term-of-service'>Terms of Service</a>
                </li>
                <li>
                  <a href='/privacy-policy'>Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}
