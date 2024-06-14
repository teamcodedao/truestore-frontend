'use client';

import {useEffect} from 'react';

import type {Product} from '@model/product';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

interface TrackingProductProps {
  product: Product;
}

export default function ProductTracking({product}: TrackingProductProps) {
  useEffect(() => {
    firebaseTracking.trackingLogs('VC', product);
  }, [product]);

  useEffect(() => {
    fbpixel.trackPageView({
      categories: 'Uncategorized',
      post_id: product.id,
      page_title: product.name,
      post_type: 'product',
    });
  }, [product.id, product.name]);

  useEffect(() => {
    fbpixel.trackViewContent({
      category_name: 'Uncategorized',
      post_id: product.id,
      page_title: product.name,
      post_type: 'product',
      content_type: 'product_group',
      content_ids: [String(product.id)],
      content_name: product.name,
      contents: [
        {
          id: String(product.id),
          quantity: 1,
        },
      ],
      currency: 'USD',
      product_price: product.regular_price ?? product.price,
      value: product.price,
    });
  }, [product.id, product.name, product.price, product.regular_price]);

  return null;
}
