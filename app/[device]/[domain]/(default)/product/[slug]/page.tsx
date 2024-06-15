import {Suspense} from 'react';
import Image from 'next/image';

import {YourCart} from '@/components/cart';
import {
  Countdown,
  HtmlReplaceImgproxy,
  MatchDevice,
  RandomNumber,
  SectionHeading,
} from '@/components/common';
import {
  ProductAttribute,
  ProductCarousel,
  ProductCartActions,
  ProductCartActionsSkeleton,
  ProductCartMobileActions,
  ProductFeature,
  ProductPrice,
  ProductTracking,
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

export const dynamic = 'error';

export async function generateMetadata({
  params,
}: GenerateMetadataProps<{slug: string}>) {
  const product = await getProduct(params.domain, params.slug, {
    throwNotFound: true,
  });

  return {
    title: `${params.domain} | ${product.name}`,
  };
}

export default async function ProductPage({params}: PageProps<{slug: string}>) {
  const domain = params.domain;
  const slug = params.slug;

  const product = await getProduct(domain, slug, {
    throwNotFound: true,
  });

  const promiseproductReview = getProductReviews(domain, product.id);

  return (
    <>
      <div className="flex flex-col gap-5 sm:mt-7 sm:flex-row sm:gap-x-10">
        <div className="flex-1 overflow-hidden">
          <Suspense fallback={<CarouselThumbSkeleton />}>
            <ProductCarousel images={product.images} />
          </Suspense>
        </div>
        <div className="flex-1 shrink-0">
          <a
            href="#product-reviews"
            className="-mt-2 inline-flex items-end gap-x-2"
          >
            <span className="font-medium">Rated</span>
            <div className="translate-y-0.5">
              {Array.from({length: 5}).map((_, index) => (
                <span
                  key={index}
                  className="i-radix-icons-star-filled text-yellow-400"
                ></span>
              ))}
            </div>
          </a>
          <section className="mt-4">
            <h2 className="text-balance text-2xl font-bold sm:text-3xl lg:text-4xl">
              {product.name}
            </h2>
            <div className="mt-5 space-x-1">
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
            </div>
            <div className="my-5 sm:px-5">
              <hr className="border-slate-300" />
            </div>
            <div className="text-xl font-medium uppercase lg:text-2xl">
              HURRY! ONLY <span className="text-red-500">45</span> LEFT IN
              STOCK.
            </div>
            <article className="mt-5 text-lg italic lg:text-xl [&>span]:multi-[`text-red-600;font-bold`]">
              <span>98%</span> customer buy <span>2-4</span> items to use daily
              and gifts for their beloved one
            </article>
            <article className="mt-3">
              <RandomNumber
                min={500}
                max={700}
                interval={3000}
                className="text-lg font-extrabold text-black lg:text-xl"
              />{' '}
              People are viewing right now
            </article>
            <div className="mt-3 text-lg font-bold text-red-700 lg:text-xl">
              Hurry up. This deal will end soon!!
            </div>
            <Countdown
              className="font-medium text-red-700"
              date={Date.now() + 10 * 60 * 1000}
              whenEnd={{
                text: 'Hurry up. This deal will end soon!!',
              }}
            />
            <article className="mt-5">
              <ProductFeature />
            </article>
            {!product.attributesError && (
              <>
                <div className="mt-5 space-y-4">
                  {product.attributes.map(attribute => (
                    <ProductAttribute
                      key={attribute.id}
                      name={attribute.name}
                      options={attribute.options}
                    />
                  ))}
                </div>

                <div className="mt-5">
                  <Suspense fallback={<ProductCartActionsSkeleton />}>
                    <ProductCartActions />
                  </Suspense>
                </div>
                {/* <div className="mt-0">
                  <div className="relative my-2 text-center after:multi-[`absolute;w-full;h-0.5;bg-gray-200;left-0;top-1/2;-translate-y-1/2`]">
                    <span className="relative z-10 inline-block bg-white px-3 text-sm font-medium">
                      OR
                    </span>
                  </div>
                  <Suspense fallback={<PaypalButtonSkeleton />}>
                    <ProductPayment />
                  </Suspense>
                </div> */}
                <div className="mt-5">
                  <Image
                    src={safeCheckoutImg}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>
      <div className="mt-10 sm:mt-20 lg:mt-32">
        <div className="flex flex-col items-start gap-x-5 gap-y-6 sm:flex-row">
          <SectionHeading>Description</SectionHeading>
          <div className="text-base [&_.emoji]:multi-[`size-[1em]`] [&_img.aligncenter]:multi-[`block;mx-auto`] [&_img]:inline-block">
            <HtmlReplaceImgproxy html={product.description} />
          </div>
        </div>
      </div>

      <Suspense>
        <MatchDevice show={false} devices={['mobile']}>
          <YourCart className="!fixed right-10 top-3/4 z-[100] sm:right-20 lg:right-36" />
        </MatchDevice>
      </Suspense>

      <Suspense>
        <MatchDevice devices={['mobile']}>
          <ProductCartMobileActions />
        </MatchDevice>
      </Suspense>

      <div
        id="product-reviews"
        className="mt-10 has-[[data-empty='true']]:hidden sm:mt-20 lg:mt-32"
      >
        <div className="flex flex-col items-start gap-x-5 gap-y-6 sm:flex-row">
          <SectionHeading>Reviews</SectionHeading>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductReview promiseproductReview={promiseproductReview} />
          </Suspense>
        </div>
      </div>

      <Suspense>
        <ProductTracking product={product} />
      </Suspense>
    </>
  );
}
