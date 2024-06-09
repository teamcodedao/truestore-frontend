'use client';

import {use, useState} from 'react';
import {useRouter} from 'next/navigation';

import clsx from 'clsx';
import {toast} from 'sonner';

import {ProductAttribute} from '@/components/product';
import {SpinNumber} from '@/components/ui';
import {formatCurrency} from '@automattic/format-currency';
import {useImgproxy} from '@common/platform';
import {
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

interface MobileAddToCartProps {
  buyNow?: boolean;
  product: Product;
  variationPromise: Promise<ProductVariation[]>;
  onClose: () => void;
  onAddtoCart: (params: {
    variation: ProductVariation;
    quantity: number;
  }) => void;
}

export default function MobileAddToCart({
  product,
  buyNow,
  variationPromise,
  onClose,
  onAddtoCart,
}: MobileAddToCartProps) {
  const router = useRouter();
  const imgproxy = useImgproxy();

  const variations = use(variationPromise);
  const variation = useProductVariation(variations);

  const [quantity, setQuantity] = useState(1);

  let regular_price = product.regular_price;
  let price = product.price;

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.sale_price || variation.price || price;
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
    }

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
    firebaseTracking.trackingLogs('ATC1', product);
  }

  return (
    <div className="flex size-full flex-col overflow-y-auto scrollbar-hide">
      <div className="flex gap-2">
        <div className="size-[70px] shrink-0 bg-gray-50">
          <img
            src={imgproxy(
              variation?.image.thumb ?? variation?.image.src ?? '',
              ['rs:fit:100'],
            )}
            alt=""
            className="size-full object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-red-500">
            This deal will end soon!!
          </p>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(parseFloat(price), 'USD', {
              stripZeros: true,
            })}
          </p>
          {regular_price && (
            <p className="space-x-1 text-base font-medium">
              <span className="text-gray-400 line-through">
                {formatCurrency(parseFloat(regular_price), 'USD', {
                  stripZeros: true,
                })}
              </span>
              {price < regular_price && (
                <span className="rounded bg-red-50 px-0.5 text-red-500/80">
                  -{((Number(price) / Number(regular_price)) * 100).toFixed(0)}%
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 border-t border-gray-200">
        {!!product.attributes?.length && (
          <div className="mt-5 space-y-4">
            {product.attributes.map((attribute, index) => (
              <ProductAttribute
                key={index}
                name={attribute.name}
                options={attribute.options}
                size="sm"
              />
            ))}
          </div>
        )}
      </div>
      <div className="my-5 flex items-center justify-between border-t border-gray-200 pt-5">
        <span className="text-sm font-medium capitalize">Quantity</span>
        <SpinNumber value={quantity} min={1} size="sm" onChange={setQuantity} />
      </div>
      <div className="sticky bottom-0 mt-auto shrink-0">
        <button
          className={clsx(
            'w-full rounded-full bg-gradient-to-r px-2 py-3 font-semibold text-white',
            {
              'from-red-600 to-orange-500': buyNow,
              'from-yellow-500 to-orange-500': !buyNow,
            },
          )}
          onClick={handleAddToCart}
        >
          {buyNow ? 'Buy Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
