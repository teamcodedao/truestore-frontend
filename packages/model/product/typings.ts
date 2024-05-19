export * from './add-cart.action';
export * from './create-order.action';
export * from './get-product';
export * from './get-product-variations';
export * from './update-order.action';
export * from './use-params-variation';
export * from './use-product-variation';

export interface ProductAttribute<O> {
  id: number;
  name: 'COLOR' | 'SIZE ( US )'; // string
  position: number;
  variation: boolean;
  options: O[];
}

export interface ProductImage {
  id: number;
  src: string;
  thumb?: string;
  alt?: string;
}

export interface ProductVariation {
  id: number;
  price: string;
  sale_price?: string;
  regular_price?: string;
  image: ProductImage;
  attributes: ReadonlyArray<
    Pick<ProductAttribute<unknown>, 'id' | 'name'> & {option: string}
  >;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  sale_price?: string;
  regular_price?: string;
  attributes?: ProductAttribute<string>[];
  images?: ProductImage[];
}

export interface GetParamsVariation {
  COLOR?: string;
  'SIZE ( US )'?: string;
}

export interface ProductCartItem {
  product: Pick<Product, 'id' | 'name'>;
  quantity: number;
  variantion: Pick<
    ProductVariation,
    'id' | 'price' | 'regular_price' | 'sale_price'
  > & {image: string};
}
