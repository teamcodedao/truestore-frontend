import Image from 'next/image';
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
                href='mailto:help@wideelectronics.com'
                className='block font-semibold text-white hover:text-slate-200'
              >
                help@wideelectronics.com
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
                  <a href='#'>Order Tracking</a>
                </li>
                <li>
                  <a href='#'>Shipping Policy</a>
                </li>
                <li>
                  <a href='#'>Return & Refund Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mixin/heading'>Resources</h3>
              <ul className='mixin/menu'>
                <li>
                  <a href='#'>About Us</a>
                </li>
                <li>
                  <a href='#'>Contact Us</a>
                </li>
                <li>
                  <a href='#'>Payment Methods</a>
                </li>
                <li>
                  <a href='#'>Terms of Service</a>
                </li>
                <li>
                  <a href='#'>Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}
