export * from './client';
export * from './server';

export interface PlatformConfig {
  wp_api: string;
  wp_auth: string;
  pixel_ids?: string;
  ga_ids?: string;
  paypal_client_id: string;
  email: string;
  phone?: string;
  company: string;
  address: string;
  imgproxy_url: string;
}

export type PublicPlatformConfig = Pick<
  PlatformConfig,
  | 'email'
  | 'phone'
  | 'company'
  | 'address'
  | 'imgproxy_url'
  | 'paypal_client_id'
> & {domain: string; pixel_ids: string[]; ga_ids: string[]};
