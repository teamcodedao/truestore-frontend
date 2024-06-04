export function normalizeUrl(domain: string) {
  return domain.replace(/\./g, '');
}

export function imgproxy(
  imgproxy_url: string,
  src: string,
  processing: string | string[] = ''
) {
  if (!src || imgproxy_url) {
    let path = `/_/plain/${src}`;

    if (Array.isArray(processing) && processing.length > 0) {
      path = `/_/${processing.join('/')}/plain/${src}`;
    } else {
      if (processing) {
        path = `/_/${processing}/plain/${src}`;
      }
    }

    return new URL(path, imgproxy_url).toString();
  }

  return src;
}
