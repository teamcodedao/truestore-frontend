import type {Except} from 'type-fest';

export * from './create-order.action';
export * from './update-order.action';

type PaymentMethod = 'bacs' | 'paypal';

export interface Order {
  id: number;
  currency: string;
  customer_id: number;
  discount_tax: string;
  discount_total: string;
  number: string;
  order_key: string;
  parent_id: number;
  created_via: string;
  payment_method: PaymentMethod;
  payment_method_title: string;
  payment_url: string;
  prices_include_tax: boolean;
  shipping_tax: string;
  shipping_total: string;
  cart_tax: string;
  status:
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash';
  total: string;
  total_tax: string;
  transaction_id: string;
  version: string;
  shipping: Shipping;
}

interface Billing {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

type Shipping = Except<Billing, 'email' | 'phone'>;

export interface CreateOrder {
  payment_method: PaymentMethod;
  payment_method_title: string;
  set_paid: boolean;
  line_items: LineItem[];
  billing?: Billing;
  shipping?: Shipping;
}

export interface UpdateOrder {
  billing: Billing;
  shipping: Shipping;
  set_paid: boolean;
}

interface LineItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
}

export interface CreateOrderNotes {
  note: string;
}

export interface OrderNotes {
  id: number;
  note: string;
}