'use client';

import {use, useMemo} from 'react';

import {formatCurrency} from '@automattic/format-currency';
import {ProductVariation, useParamsVariation} from '@model/product';

export interface ProductPriceProps {
  regular_price?: string;

  /** Fallback to `sale_price` */
  price: string;
}

export function ImplProductPrice({regular_price, price}: ProductPriceProps) {
  return (
    <div className='space-x-1'>
      {!!regular_price && (
        <span className='text-xl font-medium text-slate-500 line-through'>
          {formatCurrency(parseFloat(regular_price), 'USD', {
            stripZeros: true,
          })}
        </span>
      )}
      <span className='text-2xl font-bold text-red-500'>
        {formatCurrency(parseFloat(price), 'USD', {
          stripZeros: true,
        })}
      </span>
    </div>
  );
}

export default function ProductPrice({
  getVariationPromise,
  ...props
}: ProductPriceProps & {getVariationPromise: Promise<ProductVariation[]>}) {
  const paramVariation = useParamsVariation();
  const productVariations = use(getVariationPromise);

  let regular_price = props.regular_price;
  let price = props.price;

  const variation = useMemo(() => {
    return productVariations.find(item => {
      const checkColor = !!item.attributes.find(
        attr => attr.name === 'COLOR' && attr.option === paramVariation?.COLOR
      );

      if (checkColor) {
        return !!item.attributes.find(
          attr =>
            attr.name === 'SIZE ( US )' &&
            attr.option === paramVariation?.['SIZE ( US )']
        );
      }

      return false;
    });
  }, [paramVariation, productVariations]);

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.sale_price || variation.price || price;
  }

  return (
    <ImplProductPrice {...props} regular_price={regular_price} price={price} />
  );
}
