export * from './client';
export * from './rsc';

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
  alt?: string;
}

export interface ProductVariationResponse {
  id: number;
  price: string;
  sale_price?: string;
  regular_price?: string;
  image: ProductImage;
  shipping_class: string;
  shipping_class_id: number;
  shipping_value: number;
  sku: string;
  attributes: {name: string; option: string}[];
}

export interface ProductResponse {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  price: string;
  sale_price?: string;
  regular_price?: string;
  attributes: ProductAttribute<string>[];
  images: ProductImage[];
}

export interface ProductReview {
  id: number;
  created_at: string;
  review: string;
  rating: string;
  reviewer_name: string;
  reviewer_email: string;
  verified: boolean;
}

export type ProductVariation = Pick<
  ProductVariationResponse,
  | 'id'
  | 'attributes'
  | 'shipping_class'
  | 'shipping_class_id'
  | 'shipping_value'
> & {
  regular_price: number;
  price: number;
  image: string;
};

export type Product = Pick<
  ProductResponse,
  'id' | 'name' | 'slug' | 'permalink' | 'description' | 'attributes'
> & {
  attributesError: boolean;
  regular_price: number;
  price: number;
  images: string[];
  variations: ProductVariation[];
};
