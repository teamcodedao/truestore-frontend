import {Suspense} from 'react';

import {ProductTracking} from '@/components/product';
import {getPlatformConfig} from '@common/platform/ssr';
import {getProduct} from '@model/product/ssr';

import DefaultTheme from './_default';
import ForestTheme from './_forest';

export const dynamic = 'error';

export async function generateMetadata({
  params,
}: GenerateMetadataProps<{slug: string}>) {
  const product = await getProduct(params.domain, params.slug, {
    throwNotFound: true,
  });
  return {
    title: product.name,
    openGraph: {
      title: product.name,
      images: [
        {
          url: product.images[0],
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({params}: PageProps<{slug: string}>) {
  const domain = params.domain;
  const slug = params.slug;

  const platform = await getPlatformConfig(domain);
  const theme = platform?.theme || 'default';
  const product = await getProduct(domain, slug, {
    throwNotFound: true,
  });

  return (
    <>
      {theme === 'forest' ? (
        <ForestTheme domain={domain} product={product} />
      ) : (
        <DefaultTheme domain={domain} product={product} />
      )}
      <Suspense>
        <ProductTracking product={product} />
      </Suspense>
    </>
  );
}
