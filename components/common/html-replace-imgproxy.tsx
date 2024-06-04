'use client';

import clsx from 'clsx';
import parse from 'html-react-parser';

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
            className={clsx(className, 'bg-slate-100')}
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
