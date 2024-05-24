import {getGenerelParameters} from './utils';

export function trackToCart(
  parameters: facebook.Pixel.AddToCartParameters & Record<string, unknown>
) {
  if (typeof window === 'undefined' || !fbq) {
    return;
  }

  fbq('track', 'AddToCart', {
    ...parameters,
    ...getGenerelParameters(),
    // Custom parameters
    page_title: parameters.content_name,
    post_type: parameters.content_type,
  });
}
