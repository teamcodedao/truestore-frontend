'use client';

import {useEffect} from 'react';

import {fbpixel} from '@common/fbpixel';

interface TrackingProductProps {
  id: number;
  title: string;
  productPrice?: string;
  price: string;
}

export default function ProductTracking({
  id,
  title,
  productPrice,
  price,
}: TrackingProductProps) {
  useEffect(() => {
    fbpixel.trackPageView({
      categories: 'Uncategorized',
      post_id: id,
      page_title: title,
      post_type: 'product',
    });
  }, [id, title]);

  useEffect(() => {
    fbpixel.trackViewContent({
      category_name: 'Uncategorized',
      post_id: id,
      page_title: title,
      post_type: 'product',
      content_type: 'product_group',
      content_ids: [String(id)],
      content_name: title,
      contents: [
        {
          id: String(id),
          quantity: 1,
        },
      ],
      currency: 'USD',
      product_price: parseFloat(productPrice ?? price),
      value: parseFloat(price),
    });
  }, [id, price, productPrice, title]);

  return null;
}
