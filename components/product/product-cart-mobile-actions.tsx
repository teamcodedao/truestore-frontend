'use client';

import {useRouter} from 'next/navigation';

import clsx from 'clsx';

import {CheckoutCartError, MobileAddToCart} from '@/components/cart';
import {useCart} from '@model/cart';
import offcanvas from '@ui/offcanvas';

export default function ProductCartMobileActions() {
  const [{carts}] = useCart();
  const router = useRouter();

  const handleOpenToCartSheet = (options?: {buyNow: boolean}) => {
    offcanvas.bottomSheet({
      ssr: false,
      fallback: <CheckoutCartError onClose={offcanvas.close} />,
      content: <MobileAddToCart buyNow={options?.buyNow} />,
    });
  };

  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 z-[997] w-full bg-white p-2',
        'flex',
        '*:multi-[`text-white;font-semibold;px-1;py-2.5;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap`]',
        '[&_span[class*=i-]]:multi-[`text-lg`]',
        'sm:*:multi-[`px-5`]',
      )}
    >
      <button
        className="rounded-l-full bg-gradient-to-r from-yellow-500 to-orange-500"
        onClick={() => {
          handleOpenToCartSheet();
        }}
      >
        <span className="i-carbon-shopping-cart-plus"></span>
        <span>Add to cart</span>
      </button>
      <button
        className="rounded-r-full bg-gradient-to-r from-red-600 to-orange-500"
        onClick={() => {
          if (carts.length === 0) {
            handleOpenToCartSheet({buyNow: true});
            return;
          }
          router.push('/checkout?from=product');
        }}
      >
        <span className="i-carbon-wallet"></span>
        <span>Buy now</span>
      </button>
    </div>
  );
}
