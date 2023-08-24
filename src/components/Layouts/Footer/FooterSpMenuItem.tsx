import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FooterNotificationBadge } from './FooterNotificationBadge';
import { ColoredImage } from '@/components/Image/ColoredImage';

type Props = {
  href: string;
  hasBadge?: boolean;
  children: ReactNode;
  image: string;
  imageWidth: number;
  imageHeight: number;
  isCurrent: boolean;
};

export const FooterSpMenuItem = (props: Props) => {
  const { children, href, hasBadge = false, image, imageWidth, imageHeight, isCurrent } = props;

  return (
    <li className="flex flex-1 flex-col items-center gap-1">
      <Link href={href}>
        <a className="flex flex-col items-center gap-1">
          <div className="relative flex h-6 w-full items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center">
              <ColoredImage
                src={image}
                color={isCurrent ? '#0758e4' : '#999'}
                width={`${imageWidth}px`}
                height={`${imageHeight}px`}
              />
            </div>
            {hasBadge && <FooterNotificationBadge />}
          </div>
          <span className={`text-medii-sm ${isCurrent ? 'font-semibold text-medii-blue-base' : 'font-light'}`}>
            {children}
          </span>
        </a>
      </Link>
    </li>
  );
};
