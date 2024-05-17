import {Product} from '@/typings/product';

export type DerivedProduct = ReturnType<typeof transformProduct>;

export function transformProduct(product: Product) {
  let sale_price = product.sale_price || product.price;

  // if (sale_price === '') {
  //   const [price] = (product.price_html ?? '').match(
  //     /(?<!\#)\d+(\.\d+)?(?!\;)/
  //   ) ?? [null];
  //   sale_price = price ?? sale_price;
  // }

  return {
    ...product,
    sale_price,
  };
}
