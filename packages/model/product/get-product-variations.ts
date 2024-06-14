import {createPlatformClient} from '@common/platform/ssr';
import type {ProductVariationResponse} from '@model/product';

async function fetchVariations(
  domain: string,
  id: string | number,
  page: number,
  perPage: number,
) {
  const client = await createPlatformClient(domain);
  return client
    .get(`v3/products/${id}/variations`, {
      searchParams: {
        page,
        per_page: perPage,
      },
    })
    .json<ProductVariationResponse[]>();
}

export async function getProductVariations(
  domain: string,
  id: string | number,
) {
  let page = 1;
  const perPage = 100;

  try {
    let res = await fetchVariations(domain, id, page, perPage);
    let variations = res;
    while (res.length >= perPage) {
      page += 1;
      res = await fetchVariations(domain, id, page, perPage);
      variations = variations.concat(res);
    }
    return variations;
  } catch (error) {
    console.error(error);
    return [];
  }
}
