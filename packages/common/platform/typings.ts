import {THEMES} from './shared';

export * from './client';
export * from './rsc';

export type Theme = (typeof THEMES)[number];

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
  theme?: Theme & string;
  customScripts?: string[];
  system?: 'v2';
  logo?: string;
}

export type PublicPlatformConfig = Pick<
  PlatformConfig,
  | 'email'
  | 'phone'
  | 'company'
  | 'address'
  | 'imgproxy_url'
  | 'paypal_client_id'
> & {
  domain: string;
  pixel_ids: string[];
  ga_ids: string[];
  theme: Theme;
  customScripts: string[];
  logo?: string;
};
