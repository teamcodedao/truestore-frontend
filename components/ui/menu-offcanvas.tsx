'use client';

import Link from 'next/link';

import {cn} from '@/lib/cn';
import offcanvas from '@ui/offcanvas';

interface MenuOffcanvasProps extends React.ComponentProps<'button'> {}

function MenuContent() {
  return (
    <aside className="relative w-[350px]">
      <menu
        className={cn(
          'space-y-5 p-10 font-bold',
          '[&_a]:multi-[`flex;items-center;gap-x-1.5`]',
          '[&_span[class*=i-]]:multi-[`text-2xl;-translate-y-0.5`]',
        )}
      >
        <li>
          <Link href="/">
            <span className="i-carbon-home"></span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/order-tracking">
            <span className="i-carbon-settings-adjust"></span>
            <span>Order Tracking</span>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <span className="i-carbon-email"></span>
            <span>Contact Us</span>
          </Link>
        </li>
      </menu>
      <button
        aria-label="Close Menu"
        className="absolute right-5 top-5"
        onClick={() => {
          offcanvas.close();
        }}
      >
        <span className="i-carbon-close text-2xl"></span>
      </button>
    </aside>
  );
}

export default function MenuOffcanvas(props: MenuOffcanvasProps) {
  return (
    <button
      aria-label="Menu"
      {...props}
      onClick={() => {
        offcanvas.show({
          content: <MenuContent />,
        });
      }}
    >
      <span className="i-radix-icons-hamburger-menu text-4xl"></span>
    </button>
  );
}
