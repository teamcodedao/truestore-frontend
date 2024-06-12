'use client';

import {use, useState} from 'react';
import {useRouter} from 'next/navigation';

import clsx from 'clsx';
import {toast} from 'sonner';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {SpinNumber} from '@/components/ui';
import {useCart} from '@model/cart';
import {
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';
import offcanvas from '@ui/offcanvas';

import {transformProductToCart} from './utils';

interface ProductCartActionsProps {
  min?: number;
  max?: number;
  product: Product;
  variationPromise: Promise<ProductVariation[]>;
}

export function ProductCartActionsSkeleton() {
  return (
    <div className="flex h-[48px] animate-pulse gap-x-3">
      <div className="w-[88px] bg-gray-200"></div>
      <div className="flex grow gap-x-3">
        <div className="flex-1 rounded bg-gray-200"></div>
        <div className="flex-1 rounded bg-gray-200"></div>
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
  const variation = useProductVariation(productVariations);
  const [quantity, setQuantity] = useState(1);

  const [{carts}, {addCart}] = useCart();
  const router = useRouter();

  function handleAddToCart(options?: {noVerify: boolean}) {
    if (!variation) {
      if (!options?.noVerify) {
        toast.error('Please, choose product options');
      }
      return null;
    }

    addCart(
      transformProductToCart({
        product,
        quantity,
        variation,
      }),
    );

    fbpixel.trackToCart({
      content_name: product.name,
      content_ids: [String(variation.id)],
      value: parseFloat(variation.sale_price || variation.price),
      contents: [
        {
          id: variation.id,
          quantity,
        },
      ],
      post_id: product.id,
    });

    firebaseTracking.trackingLogs('VC', product);
    firebaseTracking.trackingLogs('ATC', product);
  }

  return (
    <div className="flex gap-x-3">
      <SpinNumber value={quantity} min={min} max={max} onChange={setQuantity} />
      <div
        className={clsx(
          'flex grow gap-x-3',
          '*:multi-[`rounded;text-white;font-bold;px-2;py-3;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap`]',
          '[&_span[class*=i-]]:multi-[`text-xl`]',
          'sm:*:multi-[`px-5`]',
        )}
      >
        <button
          className="bg-black hover:bg-black/80"
          onClick={() => {
            if (handleAddToCart() !== null) {
              offcanvas.show({
                direction: 'right',
                ssr: false,
                fallback: <CheckoutCartError onClose={offcanvas.close} />,
                content: <CheckoutCart onClose={offcanvas.close} />,
              });
            }
          }}
        >
          <span className="i-carbon-shopping-cart-plus"></span>
          <span>Add to cart</span>
        </button>
        <button
          className="bg-orange-600 hover:bg-orange-500"
          onClick={() => {
            firebaseTracking.trackingLogs('CO', product);
            if (carts.length === 0) {
              handleAddToCart({noVerify: true});
            }
            router.push('/checkout?from=product');
          }}
        >
          <span className="i-carbon-wallet"></span>
          <span>Buy now</span>
        </button>
      </div>
    </div>
  );
}
