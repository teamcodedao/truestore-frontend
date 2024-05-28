'use client';

import parse from 'html-react-parser';

import {imgproxy} from '@/lib/imgproxy';

interface HtmlReplaceImgproxyProps {
  html: string;
}

export default function HtmlReplaceImgproxy({html}: HtmlReplaceImgproxyProps) {
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
            className={className}
            srcSet={srcset}
            loading='lazy'
            {...(src
              ? {
                  src: imgproxy(src),
                }
              : rest)}
          />
        );
      }
    },
  });
}
