import {getProduct} from '@model/product/ssr';

import ProductProvider from './provider';

export default async function ProductLayout({
  children,
  params,
}: LayoutProps<{slug: string}>) {
  const domain = params.domain;
  const slug = params.slug;

  const product = await getProduct(domain, slug, {
    throwNotFound: true,
  });

  return <ProductProvider initialState={product}>{children}</ProductProvider>;
}
