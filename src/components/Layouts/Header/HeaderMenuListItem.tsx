import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/Parts/Badge/Badge';
import styles from './HeaderMenuListItem.module.scss';

type Props = {
  children: React.ReactNode;
  badgeText?: string;
  href: string;
};

export const HeaderMenuListItem: React.FC<Props> = ({ badgeText, children, href }: Props) => {
  return (
    <li className={styles.header_menu__item}>
      <Link href={href} className="relative block text-md font-bold text-secondary no-underline">
        {children}
      </Link>
      {badgeText && (
        <Badge
          className="
            absolute
            right-[-12px]
            top-[-8px]
            flex
            h-[16px]
            w-[16px]
            items-center
            justify-center
            text-xs
          "
        >
          <div>{badgeText}</div>
        </Badge>
      )}
    </li>
  );
};
