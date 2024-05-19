'use client';

import clsx from 'clsx';

import offcanvas from '@ui/offcanvas';

function MenuContent() {
  return (
    <aside className='relative w-[350px]'>
      <menu
        className={clsx(
          'space-y-5 p-10 font-bold',
          '[&_a]:multi-[`flex;items-center;gap-x-1.5`]',
          '[&_span[class*=i-]]:multi-[`text-2xl;-translate-y-0.5`]'
        )}
      >
        <li>
          <a href='/'>
            <span className='i-carbon-home'></span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href='/order-tracking'>
            <span className='i-carbon-settings-adjust'></span>
            <span>Order Tracking</span>
          </a>
        </li>
        <li>
          <a href='/contact'>
            <span className='i-carbon-email'></span>
            <span>Contact Us</span>
          </a>
        </li>
      </menu>
      <button
        aria-label='Close Menu'
        className='absolute right-5 top-5'
        onClick={() => {
          offcanvas.close();
        }}
      >
        <span className='i-carbon-close text-2xl'></span>
      </button>
    </aside>
  );
}

export default function MenuOffcanvas() {
  return (
    <button
      aria-label='Menu'
      className='absolute left-0'
      onClick={() => {
        offcanvas.show({
          content: <MenuContent />,
        });
      }}
    >
      <span className='i-radix-icons-hamburger-menu text-4xl'></span>
    </button>
  );
}
