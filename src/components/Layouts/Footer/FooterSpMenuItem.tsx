import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FooterNotificationBadge } from './FooterNotificationBadge';

type Props = {
  href: string;
  hasBadge?: boolean;
  children: ReactNode;
  image: string;
  isCurrent: boolean;
};

export const FooterSpMenuItem = (props: Props) => {
  const { children, href, hasBadge = false, image, isCurrent } = props;

  return (
    <li className="flex flex-1 flex-col items-center gap-1">
      <div className="relative flex h-6 w-full items-center justify-center">
        <img src={image} alt="" />
        {hasBadge && <FooterNotificationBadge />}
      </div>
      <Link href={href}>
        <a className={`text-medii-sm ${isCurrent ? 'font-semibold text-medii-blue-base' : 'font-light'}`}>{children}</a>
      </Link>
    </li>
  );
};
