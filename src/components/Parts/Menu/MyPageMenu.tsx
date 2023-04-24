import React from 'react';
import Link from 'next/link';
import styles from './MyPageMenu.module.scss';
import { useRouter } from 'next/router';

const getActiveMenuItemStyle = (
  routePath: string,
  activePaths: string[]
): string => {
  if (activePaths.includes(routePath)) {
    return `${styles.mypage_menu__item} ${styles.mypage_menu__item___active}`;
  }
  return styles.mypage_menu__item;
};

export const MyPageMenu: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.mypage_nav}>
      <ul className={styles.mypage_menu}>
        <li
          className={getActiveMenuItemStyle(router.pathname, [
            '/EditProfile',
            '/Document',
          ])}
        >
          <Link href="/EditProfile">
            <a className={styles.mypage_menu__link}>
              <span>プロフィール</span>
            </a>
          </Link>
        </li>
        <li
          className={getActiveMenuItemStyle(router.pathname, ['/PointHistory'])}
        >
          <Link href="/PointHistory">
            <a className={styles.mypage_menu__link}>
              <span className={styles.text_break_sp}>Medii</span>ポイント
            </a>
          </Link>
        </li>
        <li
          className={getActiveMenuItemStyle(router.pathname, ['/AmazonGift'])}
        >
          <Link href="/AmazonGift">
            <a className={styles.mypage_menu__link}>
              <span className={styles.text_break_sp}>Amazon</span>ギフト
            </a>
          </Link>
        </li>
        <li className={getActiveMenuItemStyle(router.pathname, ['/Affiliate'])}>
          <Link href="/Affiliate">
            <a className={styles.mypage_menu__link}>
              <span>医師紹介</span>
            </a>
          </Link>
        </li>
        <li
          className={getActiveMenuItemStyle(router.pathname, [
            '/NotifySettings',
          ])}
        >
          <Link href="/NotifySettings">
            <a className={styles.mypage_menu__link}>
              <span>通知設定</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
