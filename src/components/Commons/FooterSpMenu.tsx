import React from 'react';
import Link from 'next/link';
import styles from './FooterSpMenu.module.scss';
import { Badge } from '@/components/Parts/Badge/Badge';

export const FooterSpMenu: React.FC = () => {
  return (
    <nav className={styles.sp_footer_nav}>
      <ul className={styles.sp_footer_menu}>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___consult}`}
            >
              コンサル
            </a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___group}`}
            >
              所属グループ
            </a>
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
                    top-4
                    right-0"
          />
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
            <a
              className={`${styles.sp_footer_menu__link} ${styles.sp_footer_menu__link___example}`}
            >
              事例集
            </a>
          </Link>
        </li>
        <li className={styles.sp_footer_menu__item}>
          <Link href="/">
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
