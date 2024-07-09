'use client';

import parse from 'html-react-parser';

import {cn} from '@/lib/cn';
import {useImgproxy} from '@common/platform';

interface HtmlReplaceImgproxyProps {
  html: string;
}

export default function HtmlReplaceImgproxy({html}: HtmlReplaceImgproxyProps) {
  const imgproxy = useImgproxy();

  return parse(html, {
    replace(domNode) {
      if (domNode.type === 'tag' && domNode.name === 'img') {
        const {
          src,
          width,
          height,
          alt,
          srcset,
          class: className,
          ...rest
        } = domNode.attribs;
        return (
          <img
            width={width}
            height={height}
            alt={alt}
            className={cn(className, 'bg-slate-100')}
            srcSet={srcset}
            loading="lazy"
            {...(src
              ? {
                  src: imgproxy(src),
                }
              : rest)}
            style={undefined}
          />
        );
      }
    },
  });
}
