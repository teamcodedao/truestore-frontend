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
  attributes: ProductAttribute<string>[];
}
