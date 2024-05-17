export interface ProductAttribute<O> {
  id: number;
  name: string;
  position: number;
  variation: boolean;
  options: O[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  attributes: ProductAttribute<string>[];
}
