import React from 'react';
import Link from 'next/link';
import styles from './TooltipSpMenu.module.scss';

export const TooltipSpMenu: React.FC = () => {
  return (
    <div className={styles.tooltip_sp}>
      <div className={styles.tooltip_sp_nav}>
        <h2 className={styles.tooltip_sp_nav__heading}>マイページ</h2>
        <ul className={styles.tooltip_sp_menu}>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___profile}`}
              >
                プロフィール
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___point}`}
              >
                Mediiポイント
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___gift}`}
              >
                Amazonギフト
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___invite}`}
              >
                医師紹介
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___notify}`}
              >
                通知設定
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.tooltip_sp_nav}>
        <h2 className={styles.tooltip_sp_nav__heading}>サービス関連情報</h2>
        <ul className={styles.tooltip_sp_menu}>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___help}`}
              >
                E-コンサルの使い方
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___faq}`}
              >
                よくある質問
              </a>
            </Link>
          </li>
          <li className={styles.tooltip_sp_menu__item}>
            <Link href="/">
              <a
                className={`${styles.tooltip_sp_menu__link} ${styles.tooltip_sp_menu__link___contact}`}
              >
                お問合わせ
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
