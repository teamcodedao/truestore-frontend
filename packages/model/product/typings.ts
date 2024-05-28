export * from './get-product';
export * from './get-product-variations';
export * from './use-params-variation';
export * from './use-product-variation';

export interface ProductAttribute<O> {
  id: number;
  name: string;
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
  shipping_class: string;
  shipping_class_id: string;
  attributes: ReadonlyArray<
    Pick<ProductAttribute<unknown>, 'id' | 'name'> & {option: string}
  >;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  sale_price?: string;
  regular_price?: string;
  attributes?: ProductAttribute<string>[];
  images?: ProductImage[];
}
