'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

import currency from 'currency.js';
import {toast} from 'sonner';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {ProductAttribute} from '@/components/product';
import {SpinNumber} from '@/components/ui';
import {cn} from '@/lib/cn';
import {useImgproxy} from '@common/platform';
import {type Product, type ProductVariation} from '@model/product';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';
import offcanvas from '@ui/offcanvas';

interface MobileAddToCartProps {
  buyNow?: boolean;
  product: Product;
  variation?: ProductVariation | null;
  onClose: () => void;
  onAddtoCart: (params: {
    variation: ProductVariation;
    quantity: number;
  }) => void;
}

export default function MobileAddToCart({
  product,
  variation,
  buyNow,
  onClose,
  onAddtoCart,
}: MobileAddToCartProps) {
  const router = useRouter();
  const imgproxy = useImgproxy();

  const [quantity, setQuantity] = useState(1);

  let regular_price = product.regular_price;
  let price = product.price;

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.price || price;
  }

  function handleAddToCart() {
    if (!variation) {
      toast.error('Please, choose product options');
      return null;
    }

    onAddtoCart({
      variation,
      quantity,
    });

    if (buyNow) {
      router.push(`/checkout?from=mobile_cart`);
    } else {
      onClose();
      offcanvas.show({
        direction: 'right',
        ssr: false,
        fallback: <CheckoutCartError onClose={offcanvas.close} />,
        content: <CheckoutCart onClose={offcanvas.close} />,
      });
    }

    fbpixel.trackToCart({
      content_name: product.name,
      content_ids: [String(variation.id)],
      value: variation.price,
      contents: [
        {
          id: variation.id,
          quantity,
        },
      ],
      post_id: product.id,
    });

    firebaseTracking.trackingLogs(['VC', 'ATC', 'ATC1'], product);
  }

  return (
    <div className="flex size-full flex-col overflow-y-auto scrollbar-hide">
      <div className="sticky top-0 flex gap-2 border-b border-gray-200 bg-white pb-3">
        <div className="size-[70px] shrink-0 bg-gray-50">
          <img
            src={imgproxy(variation?.image ?? '', ['rs:fit:100'])}
            alt=""
            className="size-full object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-red-500">
            This deal will end soon!!
          </p>
          <p className="text-2xl font-bold text-red-500">
            {currency(price).format()}
          </p>
          {!!regular_price && (
            <p className="space-x-1 text-base font-medium">
              <span className="text-gray-400 line-through">
                {currency(regular_price).format()}
              </span>
              {price < regular_price && (
                <span className="rounded bg-red-50 px-0.5 text-red-500">
                  -{Math.floor(((regular_price - price) / regular_price) * 100)}
                  %
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {!product.attributesError && (
        <>
          <div className="pb-3">
            <div className="mt-5 space-y-4">
              {product.attributes.map((attribute, index) => (
                <ProductAttribute
                  key={index}
                  name={attribute.name}
                  options={attribute.options}
                />
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 mt-auto shrink-0 bg-white">
            <div className="mb-5 flex items-center justify-between border-t border-gray-200 pt-5">
              <span className="font-bold">Quantity</span>
              <SpinNumber
                value={quantity}
                min={1}
                size="sm"
                onChange={setQuantity}
              />
            </div>
            <button
              className={cn(
                'w-full rounded bg-gradient-to-r px-2 py-2.5 font-semibold text-white',
                {
                  'from-red-600 to-primary-500': buyNow,
                  'from-primary-400 to-primary-600 forest:multi-[bg-primary-600;bg-none]':
                    !buyNow,
                },
              )}
              onClick={handleAddToCart}
            >
              {buyNow ? 'Buy Now' : 'Add to Cart'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
