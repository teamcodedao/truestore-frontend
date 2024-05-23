'use client';

import {use, useState} from 'react';
import Link from 'next/link';

import clsx from 'clsx';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {getCurrentEventInfo} from '@/lib/event-info';
import {useCart} from '@model/cart';
import {
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';
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
  const variation = useProductVariation(productVariations);
  const [quantity, setQuantity] = useState(1);

  const [, {addCart}] = useCart();

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
            if (!variation) {
              alert('Please, choose product options');
              return;
            }
            const eventInfo = getCurrentEventInfo();
            fbq('track', 'AddToCart', {
              category_name: 'Uncategorized',
              content_ids: [variation.id],
              content_name: product.name,
              content_type: 'product',
              contents: [{"id":variation.id,"quantity":1}],
              currency: 'USD',
              event_day: eventInfo.event_day,
              event_month: eventInfo.event_month,
              event_time: eventInfo.event_time,
              event_url: eventInfo.event_url,
              landing_page: eventInfo.event_url,
              page_title: product.name,
              plugin: 'DevReact',
              post_id: product.id,
              post_type: 'product',
              traffic_source: 'direct',
              user_role: 'guest',
              value: variation.price
          });
            addCart({
              product: {
                id: product.id,
                name: product.name,
              },
              quantity,
              variation: {
                id: variation.id,
                price: variation.price,
                regular_price: variation.regular_price,
                sale_price: variation.sale_price,
                image: variation.image.src || product.images?.[0].src,
                attributes: variation.attributes.map(attr => attr.option),
              },
            });

            offcanvas.show({
              direction: 'right',
              ssr: false,
              fallback: <CheckoutCartError onClose={offcanvas.close} />,
              content: <CheckoutCart onClose={offcanvas.close} />,
            });
          }}
        >
          <span className='i-carbon-shopping-cart-plus'></span>
          <span>Add to cart</span>
        </button>
        <Link
          href='/checkout?from=product'
          className='bg-orange-600 hover:bg-orange-500'
        >
          <span className='i-carbon-wallet'></span>
          <span>Buy now</span>
        </Link>
      </div>
    </div>
  );
}
