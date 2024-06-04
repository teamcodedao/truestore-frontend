export * from './client';
export * from './server';

export interface PlatformConfig {
  wp_api: string;
  pixel_ids: string;
  paypal_client_id: string;
  email: string;
  phone?: string;
  company: string;
  address: string;
}

export type PublicPlatformConfig = Pick<
  PlatformConfig,
  'email' | 'phone' | 'company' | 'address'
> & {domain: string};
