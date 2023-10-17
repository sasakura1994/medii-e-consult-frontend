import React from 'react';
import Link from 'next/link';
import styles from './MyPageMenu.module.scss';
import { useRouter } from 'next/router';

const getActiveMenuItemStyle = (routePath: string, activePaths: string[]): string => {
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
        <li className={getActiveMenuItemStyle(router.pathname, ['/editprofile', '/document'])}>
          <Link href="/EditProfile" className={styles.mypage_menu__link}>
            <span>プロフィール</span>
          </Link>
        </li>
        <li className={getActiveMenuItemStyle(router.pathname, ['/pointhistory'])}>
          <Link href="/PointHistory" className={styles.mypage_menu__link}>
            <span className={styles.text_break_sp}>Medii</span>ポイント
          </Link>
        </li>
        <li className={getActiveMenuItemStyle(router.pathname, ['/amazongift'])}>
          <Link href="/AmazonGift" className={styles.mypage_menu__link}>
            <span className={styles.text_break_sp}>Amazon</span>ギフト
          </Link>
        </li>
        <li className={getActiveMenuItemStyle(router.pathname, ['/affiliate'])}>
          <Link href="/Affiliate" className={styles.mypage_menu__link}>
            <span>医師紹介</span>
          </Link>
        </li>
        <li className={getActiveMenuItemStyle(router.pathname, ['/notifysettings'])}>
          <Link href="/NotifySettings" className={styles.mypage_menu__link}>
            <span>通知設定</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
