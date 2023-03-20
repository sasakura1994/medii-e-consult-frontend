import Link from 'next/link';
import React from 'react';
import { Badge } from '@/components/Parts/Badge/Badge';
import styles from './HeaderMenuListItem.module.scss';

type Props = {
  children: React.ReactNode;
  badgeText?: string;
  href: string;
};

export const HeaderMenuListItem: React.FC<Props> = ({
  badgeText,
  children,
  href,
}: Props) => {
  return (
    <li className={styles.header_menu__item}>
      <Link href={href}>
        <a className="relative block text-[#333333] no-underline">{children}</a>
      </Link>
      {/*  暫定。他のバッジのパターンがあれば別のやり方のほうが良いかもしれない。
      もしくはバッジがある場合はこのコンポーネントを使わないなど */}
      {badgeText && (
        <Badge
          text={badgeText}
          styles="bg-red-400
                      text-white
                      text-xxs
                      text-center
                      leading-normal
                      w-[33px]
                      rounded-full
                      absolute
                      top-[-11px]
                      -left-0.5"
        />
      )}
    </li>
  );
};
