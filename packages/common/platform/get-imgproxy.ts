import {getPlatformConfig} from './get-platform-config';
import {imgproxy} from './utils';

export async function getImgProxy(domain: string) {
  const platform = await getPlatformConfig(domain);

  return (src: string, processing: string | string[] = '') => {
    return imgproxy(platform.imgproxy_url, src, processing);
  };
}
