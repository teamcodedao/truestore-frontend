'use client';

import {useCallback} from 'react';
import {useRouter} from 'next/navigation';

import clsx from 'clsx';

import {CheckoutCartError, MobileAddToCart} from '@/components/cart';
import {transformProductToCart, useCart} from '@model/cart';
import {
  ProductProvider,
  type ProductVariation,
  useProduct,
  useProductVariation,
} from '@model/product';
import {firebaseTracking} from '@tracking/firebase';
import offcanvas from '@ui/offcanvas';

function MobileAddToCartProvider({
  children,
}: {
  children: ({
    variation,
  }: {
    variation: ProductVariation | null;
  }) => React.ReactNode;
}) {
  const variation = useProductVariation();

  return children({variation});
}

export default function ProductCartMobileActions() {
  const router = useRouter();
  const product = useProduct();
  const [{carts}, {addCart}] = useCart();

  const handleOpenToCartSheet = useCallback(
    (options?: {buyNow: boolean}) => {
      offcanvas.bottomSheet({
        ssr: false,
        loading: <div>Loading...</div>,
        fallback: <CheckoutCartError />,
        content: (
          <ProductProvider initialState={product}>
            <MobileAddToCartProvider>
              {({variation}) => (
                <MobileAddToCart
                  product={product}
                  variation={variation}
                  buyNow={options?.buyNow}
                  onClose={offcanvas.close}
                  onAddtoCart={params =>
                    addCart(
                      transformProductToCart({
                        ...params,
                        product,
                      }),
                    )
                  }
                />
              )}
            </MobileAddToCartProvider>
          </ProductProvider>
        ),
      });
    },
    [addCart, product],
  );

  return (
    <div className="fixed bottom-0 left-0 z-[997] flex w-full gap-2 bg-white p-2">
      <div
        className={clsx(
          'flex grow',
          '*:multi-[`text-white;font-semibold;px-1;py-4;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap;bg-gradient-to-r;shrink-0`]',
          '[&_span[class*=i-]]:multi-[`text-lg`]',
          'sm:*:multi-[`px-5`]',
        )}
      >
        <button
          className="rounded-l from-yellow-500 to-orange-500"
          onClick={() => {
            handleOpenToCartSheet();
          }}
        >
          <span className="i-carbon-shopping-cart-plus"></span>
          <span>Add to cart</span>
        </button>
        <button
          className="rounded-r from-red-600 to-orange-500"
          onClick={() => {
            firebaseTracking.trackingLogs('CO', product);
            if (carts.length === 0) {
              handleOpenToCartSheet({buyNow: true});
              return;
            }
            router.push('/checkout?from=mobile_product');
          }}
        >
          <span className="i-carbon-wallet"></span>
          <span>Buy now</span>
        </button>
      </div>

      <style jsx global>
        {`
          #footer {
            padding-bottom: 40px;
          }
        `}
      </style>
    </div>
  );
}
