import Image from 'next/image';
import {formatCurrency} from '@automattic/format-currency';

import {getProduct} from '@/utils/product';

import Description from './description';
import {Countdown, RandomNumber} from '@/components/common';
import {
  ProductFeature,
  ProductCartActions,
  ProductAttribute,
  ProductCarousel,
} from '@/components/product';

import safeCheckoutImg from '@/images/safe-checkout.png';

export const dynamic = 'error';
export const revalidate = 10;

export default async function ProductPage({
  params: {id},
}: PageProps<{id: string}>) {
  const product = await getProduct(id, {throwNotFound: true});

  return (
    <>
      <div className='mt-7 flex flex-col gap-5 sm:flex-row sm:gap-x-10'>
        <div className='flex-1 overflow-hidden'>
          <ProductCarousel images={product.images} />
        </div>
        <div className='flex-1 shrink-0'>
          <section className='flex items-end gap-x-2'>
            <span className='text-sm'>Rated</span>
            <div className='translate-y-1'>
              {Array.from({length: 5}).map((_, index) => (
                <span
                  key={index}
                  className='i-radix-icons-star-filled text-yellow-400'
                ></span>
              ))}
            </div>
          </section>
          <section className='mt-4'>
            <h2 className='text-balance text-4xl font-bold'>{product.name}</h2>
            <div className='mt-5 space-x-1'>
              <span className='text-xl text-slate-500 line-through'>
                {formatCurrency(parseFloat(product.price) / 25_449, 'USD', {
                  stripZeros: true,
                })}
              </span>
              <span className='text-2xl font-bold text-red-500'>
                {formatCurrency(
                  parseFloat(product.sale_price || product.price) / 25_449,
                  'USD',
                  {
                    stripZeros: true,
                  }
                )}
              </span>
            </div>
            <div className='my-5 px-10'>
              <hr className='border-slate-300' />
            </div>
            <div className='text-2xl font-medium uppercase'>
              HURRY! ONLY <span className='text-red-500'>45</span> LEFT IN
              STOCK.
            </div>
            <article className='mt-5 text-xl italic [&>span]:multi-[`text-red-600;font-bold`]'>
              <span>98%</span> customer buy <span>2-4</span> items to use daily
              and gifts for their beloved one
            </article>
            <article className='mt-3'>
              <RandomNumber
                min={500}
                max={700}
                interval={3000}
                className='text-xl font-extrabold text-black'
              />{' '}
              People are viewing right now
            </article>
            <div className='mt-3 text-xl font-bold text-red-700'>
              Hurry up. This deal will end soon!!
            </div>
            <Countdown
              className='font-medium text-red-700'
              date={Date.now() + 10 * 60 * 1000}
              whenEnd={{
                text: 'Hurry up. This deal will end soon!!',
              }}
            />
            <article className='mt-5'>
              <ProductFeature />
            </article>
            {!!product.attributes?.length && (
              <div className='mt-5 space-y-3'>
                {product.attributes.map(attribute => (
                  <ProductAttribute
                    key={attribute.id}
                    title={attribute.name}
                    options={attribute.options}
                  />
                ))}
              </div>
            )}
            <div className='mt-5'>
              <ProductCartActions />
            </div>
            <div className='mt-10'>
              <Image
                src={safeCheckoutImg}
                alt=''
                className='w-full object-cover'
              />
            </div>
          </section>
        </div>
      </div>
      <div className='mt-10 sm:mt-20 lg:mt-32'>
        <div className='flex flex-col items-start gap-x-5 gap-y-6 sm:flex-row'>
          <span className='block w-full rounded-md bg-orange-400 px-8 py-2 text-center text-2xl font-semibold text-white sm:w-auto'>
            Description
          </span>
          <div className='[&_img]:inline-block'>
            <Description />
          </div>
        </div>
      </div>
    </>
  );
}
