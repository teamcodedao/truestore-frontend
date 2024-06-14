import {unstable_cache as cache} from 'next/cache';
import {notFound} from 'next/navigation';

import {HTTPError} from 'ky';
import * as R from 'remeda';

import {createPlatformClient} from '@common/platform/ssr';
import type {Product, ProductResponse} from '@model/product';

import {getProductVariations} from './get-product-variations';

interface GetProductParams {
  throwNotFound?: boolean;
}

export const getProduct = cache(
  async (domain: string, slug: string, params?: GetProductParams) => {
    const client = await createPlatformClient(domain);
    try {
      const [product] = await client
        .get(`v3/products`, {
          searchParams: {
            slug,
            per_page: 1,
          },
          hooks: {
            afterResponse: [
              async (request, options, response) => {
                if (response.ok) {
                  const products: Product[] = await response.clone().json();
                  if (products.length === 0) {
                    throw new HTTPError(
                      new Response(response.body, {
                        status: 404,
                        headers: response.headers,
                      }),
                      request,
                      options,
                    );
                  }
                }
                return response;
              },
            ],
          },
        })
        .json<ProductResponse[]>();

      const variations = await getProductVariations(domain, product.id);

      const attributes = R.pipe(
        variations,
        R.reduce(
          (acc, variation) => {
            return variation.attributes.reduce((acc, attribute) => {
              return {
                ...acc,
                [attribute.name]: [
                  ...(acc[attribute.name] ?? []),
                  attribute.option,
                ],
              };
            }, acc);
          },
          {} as Record<string, string[]>,
        ),
        R.mapValues(values => R.unique(values)),
      );

      const images = R.pipe(
        variations,
        R.map(R.piped(R.prop('image'), R.prop('src'))),
        R.concat(R.pipe(product.images, R.map(R.prop('src')))),
        R.unique(),
      );

      return R.pipe(
        product,
        R.pick(['id', 'name', 'description', 'slug', 'permalink', 'images']),
        R.merge({
          images,
          regular_price: Number(product.regular_price || product.price),
          price: Number(product.price),
        }),
        R.merge({
          attributes,
          variations: R.pipe(
            variations,
            R.map(variation =>
              R.pipe(
                variation,
                R.pick([
                  'id',
                  'attributes',
                  'shipping_class',
                  'shipping_class_id',
                  'shipping_value',
                ]),
                R.merge({
                  regular_price: Number(
                    variation.regular_price || variation.price,
                  ),
                  price: Number(variation.sale_price || variation.price),
                  image: variation.image.src,
                }),
              ),
            ),
          ),
        }),
      ) satisfies Product;
    } catch (error) {
      if (error instanceof HTTPError) {
        if (params?.throwNotFound && error.response.status === 404) {
          notFound();
        }
      }
      throw error;
    }
  },
  [],
  {
    revalidate: 86400,
    tags: ['product', 'all'],
  },
);
