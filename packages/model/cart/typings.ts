import type {Product, ProductVariation} from '@model/product';

export * from './client';

export interface CartItem {
  product: Pick<Product, 'id' | 'name' | 'slug' | 'permalink'>;
  quantity: number;
  variation: Pick<
    ProductVariation,
    | 'id'
    | 'price'
    | 'regular_price'
    | 'shipping_class'
    | 'shipping_class_id'
    | 'shipping_value'
  > & {image?: string; attributes: string[]; link: string};
}

export interface UpdateCartItem {
  product_id: number;
  variation_id: number;
  quantity: number;
}
