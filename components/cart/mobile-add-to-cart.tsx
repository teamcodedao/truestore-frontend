'use client';

import {use} from 'react';
import {useRouter} from 'next/navigation';

import clsx from 'clsx';
import {toast} from 'sonner';

import {ProductAttribute} from '@/components/product';
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

  const variations = use(variationPromise);
  const variation = useProductVariation(variations);

  //TODO
  const quantity = 1;

  console.log({variation});

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
    firebaseTracking.trackingLogs('ATC1', product);
  }

  return (
    <div className="flex size-full flex-col">
      <div>product info</div>
      <div>
        {!!product.attributes?.length && (
          <div className="mt-5 space-y-4">
            {product.attributes.map((attribute, index) => (
              <ProductAttribute
                key={index}
                name={attribute.name}
                options={attribute.options}
              />
            ))}
          </div>
        )}
      </div>
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
          onClick={handleAddToCart}
        >
          {buyNow ? 'Buy Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
