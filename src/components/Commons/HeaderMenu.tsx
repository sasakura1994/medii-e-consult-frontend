import React from 'react';
import Link from 'next/link';
import styles from './HeaderMenu.module.scss';
import { Badge } from '@/components/Atoms/Badge';

export const HeaderMenu: React.FC = () => {
  return (
    <>
      <nav className={styles.header_nav}>
        {/* PC Menu */}
        <ul className={styles.header_menu}>
          <li className={styles.header_menu__item}>
            <Link href="/">
              <a className={styles.header_menu__link}>コンサル一覧</a>
            </Link>
          </li>
          <li className={styles.header_menu__item}>
            <Link href="/">
              <a className={styles.header_menu__link}>所属グループ</a>
            </Link>
            <Badge
              text="NEW"
              styles="bg-red-400
                      text-white
                      text-xxs
                      text-center
                      leading-normal
                      w-[33px]
                      rounded-full
                      absolute
                      top-[-11px]
                      left-[-2px]"
            />
          </li>
          <li className={styles.header_menu__item}>
            <Link href="/">
              <a className={styles.header_menu__link}>症例バンク</a>
            </Link>
          </li>
          <li className={styles.header_menu__item}>
            <Link href="/">
              <a className={styles.header_menu__link}>コンサル事例集</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
