import * as v from 'valibot';

export function normalizeUrl(domain: string) {
  return domain.replace(/\./g, '');
}

export function imgproxy(
  imgproxy_url: string,
  src: string,
  processing: string | string[] = '',
) {
  if (!src || imgproxy_url) {
    const encodedSrc = encodeURIComponent(src);
    if (src.toLowerCase().endsWith('.gif')) {
      return new URL(encodedSrc, imgproxy_url).toString();
    }

    let path = `/_/plain/${encodedSrc}`;

    if (Array.isArray(processing) && processing.length > 0) {
      path = `/_/${processing.join('/')}/plain/${encodedSrc}`;
    } else {
      if (processing) {
        path = `/_/${processing}/plain/${encodedSrc}`;
      }
    }

    return new URL(path, imgproxy_url).toString();
  }

  return src;
}

export function isIp(ip?: unknown): ip is string {
  return v.safeParse(v.pipe(v.string(), v.ip()), ip).success;
}
