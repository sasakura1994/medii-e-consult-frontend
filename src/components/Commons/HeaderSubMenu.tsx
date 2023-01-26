import React from 'react';
import Link from 'next/link';
import styles from './HeaderSubMenu.module.scss';

export const HeaderSubMenu: React.FC = () => {
  return (
    <>
      <nav className={styles.header_subnav}>
        {/* PC Submenu */}
        <ul className={styles.header_submenu}>
          <li className={styles.header_submenu__item}>
            <Link href="/">
              <a className={styles.header_submenu__link}>
                <span className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___menu}`}>
                  メニュー
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.header_submenu__item}>
            <Link href="/">
              <a className={styles.header_submenu__link}>
                <span className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___seminar}`}>
                  セミナー
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.header_submenu__item}>
            <Link href="/">
              <a className={styles.header_submenu__link}>
                <span className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___mypage}`}>
                  マイページ
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* SP Submenu */}
      <nav className={styles.header_subnav_sp}>
        <ul className={styles.header_submenu_sp}>
          <li className={styles.header_submenu_sp__item}>
            <Link href="/">
              <a className={`${styles.header_submenu_sp__link} ${styles.header_submenu_sp__link___seminar}`}>
                セミナー
              </a>
            </Link>
          </li>
          <li className={styles.header_submenu_sp__item}>
            <Link href="/">
              <a className={`${styles.header_submenu_sp__link} ${styles.header_submenu_sp__link___menu}`}>メニュー</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
