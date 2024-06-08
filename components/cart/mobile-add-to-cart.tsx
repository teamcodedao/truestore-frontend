'use client';

import clsx from 'clsx';

interface MobileAddToCartProps {
  buyNow?: boolean;
}

export default function MobileAddToCart({buyNow}: MobileAddToCartProps) {
  return (
    <div className="flex size-full flex-col">
      <div>product info</div>
      <div>product attribute</div>
      <div>quantity</div>
      <div className="sticky bottom-0 mt-auto shrink-0">
        <button
          className={clsx(
            'w-full rounded-full bg-gradient-to-r px-2 py-3 font-semibold text-white',
            {
              'from-red-600 to-orange-500': buyNow,
              'from-yellow-500 to-orange-500': !buyNow,
            },
          )}
        >
          {buyNow ? 'Buy Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
