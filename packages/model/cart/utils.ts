import type {Product, ProductVariation} from '@model/product';

import type {CartItem} from './typings';

interface AddProductToCartData {
  product: Product;
  variation: ProductVariation;
  quantity: number;
}

export function transformProductToCart({
  product,
  quantity,
  variation,
}: AddProductToCartData) {
  return {
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      permalink: product.permalink,
    },
    quantity,
    variation: {
      id: variation.id,
      price: variation.price,
      regular_price: variation.regular_price,
      image: variation.image,
      link: window.location.href,
      attributes: variation.attributes.map(attr => attr.option),
      shipping_class: variation.shipping_class,
      shipping_class_id: variation.shipping_class_id,
      shipping_value: variation.shipping_value,
    },
  } satisfies CartItem;
}
