import type {Except} from 'type-fest';

import type {UpdateCartItem} from '@model/cart';

export * from './client';
export * from './rsc';

export type PaymentMethod = 'bacs' | 'ppcp-gateway';

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
  customer_note: string;
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
  billing: Billing;
  shipping: Shipping;
  line_items: LineItem[];
  date_created: string;
  date_paid: string;
}

export interface OrderTracking {
  shipping_lines: TrackingShippingLine[];
  meta_data?: OrderMetadata[];
  set_paid: boolean;
  transaction_id?: string;
  billing: Billing;
  shipping: Shipping;
  line_items: UpdateCartItem[];
  date_created: string;
  payment_method_title: string;
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

type Shipping = Except<Billing, 'email'>;

export interface CreateOrder {
  payment_method: PaymentMethod;
  payment_method_title: string;
  set_paid: boolean;
  line_items: ReadonlyArray<
    Pick<LineItem, 'product_id' | 'variation_id' | 'quantity'>
  >;
  billing?: Billing;
  shipping?: Shipping;
  shipping_lines: TrackingShippingLine[];
  meta_data?: OrderMetadata[];
  transaction_id?: string;
}
export interface CreateOrderNode {
  domain: string;
  transaction_id?: string;
  paypal_client_id?: string;
  orderData: {
    payment_method: PaymentMethod;
    payment_method_title: string;
    set_paid: boolean;
    line_items: LineItemNodeJS[];
    billing?: Billing;
    shipping?: Shipping;
    shipping_lines: TrackingShippingLine[];
    meta_data?: OrderMetadata[];
    transaction_id?: string;
    total: string;
    shipping_total: string;
  };
}
export interface UpdateOrder {
  billing: Billing;
  shipping: Shipping;
  set_paid: boolean;
  transaction_id: string;
  meta_data?: OrderMetadata[];
}

interface LineItem {
  id: number;
  name: string;
  product_id: number;
  quantity: number;
  variation_id?: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  sku: string;
  price: number;
  parent_name: string;
  taxes: unknown[];
  meta_data: ReadonlyArray<{
    id: number;
    key: string;
    value: string;
    display_key: string;
    display_value: string;
  }>;
  image: {
    id: number;
    src: string;
  };
}
interface TrackingShippingLine {
  method_id: string;
  total: string;
}

interface OrderMetadata {
  key:
    | 'ip'
    | 'UA'
    | 'QUERY'
    | 'FB_UTM'
    | (string & {
        //
      });
  value: string;
}

export interface CreateOrderNotes {
  note: string;
}

export interface OrderNotes {
  id: number;
  note: string;
}

export interface ShippingMethod {
  id: number;
  instance_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  settings: Record<string, SettingBase | SettingWithOptions>;
}

interface SettingBase {
  id: string;
  label: string;
  description: string;
  type: string;
  value: string | null;
  default: string;
  tip: string;
  placeholder: string;
}

interface SettingWithOptions extends SettingBase {
  options?: Record<string, string>;
}

export interface UpdateOrderMetadata {
  transaction_id?: string;
  ip?: string;
  invoice_id?: string;
}

interface LineItemNodeJS {
  name: string;
  product_id: number;
  product_link: string;
  quantity: number;
  variation_id?: number;
  total: string;
  price: number;
  meta_data: ReadonlyArray<{
    name: string;
    option: string;
  }>;
  image: string;
  sku?: string;
}
