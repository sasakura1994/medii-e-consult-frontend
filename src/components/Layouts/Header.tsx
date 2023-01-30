import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderMenu } from '@/components/Commons/HeaderMenu';
import { HeaderSubMenu } from '@/components/Commons/HeaderSubMenu';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__logo}>
          <Link href="/">
            <a className={styles.header__logo_link}>
              <img src="/images/side_logo.svg" alt="Medii E-コンサル" className={styles.header__logo_item} />
            </a>
          </Link>
        </div>

        <HeaderMenu />
        <HeaderSubMenu />
      </div>
    </header>
  );
};
