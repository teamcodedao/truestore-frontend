export * from './get-product';
export * from './use-params-variantion';

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
