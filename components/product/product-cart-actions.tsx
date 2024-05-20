'use client';

import {Suspense, use, useState} from 'react';

import clsx from 'clsx';

import {CheckoutCart} from '@/components/cart';
import {addCart} from '@model/cart';
import {
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';
import backdrop from '@ui/backdrop';
import offcanvas from '@ui/offcanvas';
import {SpinNumber} from '@ui/spin-number';

interface ProductCartActionsProps {
  min?: number;
  max?: number;
  product: Product;
  variationPromise: Promise<ProductVariation[]>;
}

export function ProductCartActionsSkeleton() {
  return (
    <div className='flex h-[48px] animate-pulse gap-x-3'>
      <div className='w-[88px] bg-gray-200'></div>
      <div className='flex grow gap-x-3'>
        <div className='flex-1 rounded bg-gray-200'></div>
        <div className='flex-1 rounded bg-gray-200'></div>
      </div>
    </div>
  );
}

export default function ProductCartActions({
  min = 1,
  max,
  product,
  variationPromise,
}: ProductCartActionsProps) {
  const productVariations = use(variationPromise);
  const variantion = useProductVariation(productVariations);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex gap-x-3'>
      <SpinNumber value={quantity} min={min} max={max} onChange={setQuantity} />
      <div
        className={clsx(
          'flex grow gap-x-3',
          '*:multi-[`rounded;text-white;font-bold;px-2;py-3;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap`]',
          '[&_span[class*=i-]]:multi-[`text-xl`]',
          'sm:*:multi-[`px-5`]'
        )}
      >
        <button
          className='bg-black hover:bg-black/80'
          onClick={() => {
            if (!variantion) {
              alert('Please, choose product options');
              return;
            }
            const closeBackdrop = backdrop.show();

            setTimeout(async () => {
              await addCart({
                product: {
                  id: product.id,
                  name: product.name,
                },
                quantity,
                variantion: {
                  id: variantion.id,
                  price: variantion.price,
                  regular_price: variantion.regular_price,
                  sale_price: variantion.sale_price,
                  image: variantion.image.src || product.images?.[0].src,
                  attributes: variantion.attributes.map(attr => attr.option),
                },
              });

              offcanvas.show({
                direction: 'right',
                content: (
                  <Suspense>
                    <CheckoutCart onClose={offcanvas.close} />
                  </Suspense>
                ),
              });

              setTimeout(closeBackdrop, 300);
            }, 200);
          }}
        >
          <span className='i-carbon-shopping-cart-plus'></span>
          <span>Add to cart</span>
        </button>
        <button className='bg-orange-600 hover:bg-orange-500'>
          <span className='i-carbon-wallet'></span>
          <span>Buy now</span>
        </button>
      </div>
    </div>
  );
}
