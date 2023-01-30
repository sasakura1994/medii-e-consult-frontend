import React from 'react';
import Link from 'next/link';
import styles from './FooterSpMenu.module.scss';
import { Badge } from '@/components/Atoms/Badge';

export const FooterSpMenu: React.FC = () => {
  return (
    <nav className={styles.sp_footer_nav}>
      <ul className={styles.sp_footer_menu}>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___consult}`}>コンサル</a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___group}`}>所属グループ</a>
          </Link>
          <Badge
            text="NEW"
            styles="bg-red-400
                   text-white
                   text-[10px]
                   text-center
                   leading-none
                   px-2
                   pt-[3px]
                   pb-px
                   rounded-full
                   absolute
                   top-3
                   right-[-6px]"
          />
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___example}`}>事例集</a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___bank}`}>症例バンク</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
