import type {Product, ProductVariation} from '@model/product';

export * from './use-cart';
export interface CartItem {
  product: Pick<Product, 'id' | 'name'>;
  quantity: number;
  variation: Pick<
    ProductVariation,
    'id' | 'price' | 'regular_price' | 'sale_price'
  > & {image?: string; attributes: string[]; link: string};
}

export interface UpdateCartItem {
  product_id: number;
  variation_id: number;
  quantity: number;
}
