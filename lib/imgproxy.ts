export function imgproxy(src: string, processing: string | string[] = '') {
  if (!src || process.env.NEXT_PUBLIC_IMGPROXY_URL) {
    let path = `/_/plain/${src}`;

    if (Array.isArray(processing) && processing.length > 0) {
      path = `/_/${processing.join('/')}/plain/${src}`;
    } else {
      if (processing) {
        path = `/_/${processing}/plain/${src}`;
      }
    }

    return new URL(path, process.env.NEXT_PUBLIC_IMGPROXY_URL).toString();
  }

  return src;
}
