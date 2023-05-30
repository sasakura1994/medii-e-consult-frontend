import React from 'react';
import Link from 'next/link';
import styles from './FooterSpMenu.module.scss';
import { Badge } from '@/components/Parts/Badge/Badge';

export const FooterSpMenu: React.FC = () => {
  return (
    <nav className={styles.sp_footer_nav}>
      <ul className={styles.sp_footer_menu}>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/Chat">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___consult}`}
            >
              コンサル
            </a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/Group">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___group}`}
            >
              所属グループ
            </a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/ExampleList">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___example}`}
            >
              事例集
            </a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href={process.env.CASE_BANK_URL ?? '/'}>
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___bank}`}
            >
              症例バンク
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
