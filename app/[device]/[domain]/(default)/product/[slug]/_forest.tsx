import {Suspense} from 'react';
import Image from 'next/image';

import {ErrorBoundary} from 'react-error-boundary';
import type {AsyncReturnType} from 'type-fest';

import {YourCart} from '@/components/cart';
import {
  Countdown,
  HtmlReplaceImgproxy,
  MatchDevice,
  RandomNumber,
} from '@/components/common';
import {
  ProductAttribute,
  ProductCarousel,
  ProductCartActions,
  ProductCartActionsSkeleton,
  ProductCartMobileActions,
  ProductPrice,
  ProductPromotionTag,
} from '@/components/product';
import {
  CarouselThumbSkeleton,
  PaypalButtonSkeleton,
} from '@/components/skeleton';
import {Price} from '@/components/ui';
import safeCheckoutImg from '@/images/safe-checkout.png';
import {getProduct, getProductReviews} from '@model/product/ssr';

import ProductPayment from './product-payment';
import ProductReview from './product-review';

interface PageDefaultThemeProps {
  domain: string;
  product: AsyncReturnType<typeof getProduct>;
}

export default function PageForestTheme({
  domain,
  product,
}: PageDefaultThemeProps) {
  const promiseproductReview = getProductReviews(domain, product.id);

  return (
    <>
      <div className="flex flex-col gap-5 sm:mt-4 sm:flex-row sm:gap-x-10">
        <div className="flex-1 overflow-hidden">
          <Suspense fallback={<CarouselThumbSkeleton />}>
            <ProductCarousel images={product.images} />
          </Suspense>
        </div>
        <div className="flex-1 shrink-0">
          <section>
            <h2 className="text-balance text-2xl font-bold sm:text-3xl lg:text-4xl">
              {product.name}
            </h2>
            <a href="#product-reviews" className="flex items-end gap-x-1">
              <div className="translate-y-0.5 text-2xl text-yellow">
                {Array.from({length: 5}).map((_, index) => (
                  <span key={index} className="i-carbon-star-filled"></span>
                ))}
              </div>
              <div className="text-lg font-medium">
                <span className="text-2xl">5</span> / 5.0
              </div>
            </a>
            <div className="mt-5 flex items-center gap-x-3">
              <Suspense
                fallback={
                  <Price
                    regular_price={product.regular_price}
                    price={product.price}
                  />
                }
              >
                <ProductPrice
                  regular_price={product.regular_price}
                  price={product.price}
                />
              </Suspense>

              <ProductPromotionTag />
            </div>
            <article className="mt-5 flex items-center font-medium">
              <img src="/fire.gif" alt="" className="h-8" />
              <p>
                Hurry! Only <span className="font-semibold">45</span> Left in
                stock.
              </p>
            </article>
            <article className="flex items-center font-medium">
              <img src="/point.gif" alt="" className="h-8" />
              <p>
                <span className="font-bold">
                  <RandomNumber min={500} max={700} interval={3000} />
                </span>{' '}
                People are viewing this right now
              </p>
            </article>
            <article className="mt-5">
              <span className="font-bold">Last Minute</span> - Sale end in{' '}
              <Countdown
                className="text-xl font-bold text-red-700"
                date={Date.now() + 10 * 60 * 1000}
              />
            </article>
            {!product.attributesError && (
              <>
                <div className="mt-5 space-y-4">
                  {product.attributes.map((attribute, index) => (
                    <ProductAttribute
                      key={index}
                      name={attribute.name}
                      size="xl"
                      options={attribute.options}
                    />
                  ))}
                </div>

                <div className="mt-5">
                  <Suspense fallback={<ProductCartActionsSkeleton />}>
                    <ProductCartActions />
                  </Suspense>
                </div>
                <div className="mt-0">
                  <div className="relative my-2 text-center after:multi-[`absolute;w-full;h-0.5;bg-gray-200;left-0;top-1/2;-translate-y-1/2`]">
                    <span className="relative z-10 inline-block bg-white px-3 text-sm font-medium">
                      OR
                    </span>
                  </div>
                  <Suspense fallback={<PaypalButtonSkeleton />}>
                    <ProductPayment />
                  </Suspense>
                </div>
                <div className="mt-5">
                  <Image
                    src={safeCheckoutImg}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div className="mt-10 text-base [&_.emoji]:multi-[`size-[1em]`] [&_img.aligncenter]:multi-[`block;mx-auto`] [&_img]:inline-block">
                  <ErrorBoundary fallback={null}>
                    <HtmlReplaceImgproxy html={product.description} />
                  </ErrorBoundary>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      <Suspense>
        <MatchDevice show={false} devices={['mobile']}>
          <YourCart className="!fixed right-10 top-3/4 z-[100] forest:hidden sm:right-20 lg:right-36" />
        </MatchDevice>
      </Suspense>

      <Suspense>
        <MatchDevice devices={['mobile']}>
          <ProductCartMobileActions />
        </MatchDevice>
      </Suspense>

      <ErrorBoundary fallback={null}>
        <div
          id="product-reviews"
          className="mt-10 has-[[data-empty='true']]:hidden sm:mt-20 lg:mt-32"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ProductReview
              layout="masonry"
              promiseproductReview={promiseproductReview}
            />
          </Suspense>
        </div>
      </ErrorBoundary>
    </>
  );
}
