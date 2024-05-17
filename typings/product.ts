export type * from '@/utils/product';

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
  price_html?: string;
  attributes?: ProductAttribute<string>[];
  images?: ProductImage[];
}
