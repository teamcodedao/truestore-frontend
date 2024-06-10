import {revalidateTag} from 'next/cache';
import {NextRequest} from 'next/server';

import {clearPlatformClient} from '@common/platform/ssr';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (tag) {
    revalidateTag(tag);

    if (['all', 'platform-config'].includes(tag)) {
      clearPlatformClient();
    }
  }

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
