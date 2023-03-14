import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderMenu } from '@/components/Commons/HeaderMenu';
import { HeaderSubMenu } from '@/components/Commons/HeaderSubMenu';
import { HeaderContainer } from './HeaderContainer';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <button
        type="button"
        onClick={() => history.back()}
        className={styles.back_btn}
      >
        <img
          src="/images/union.png"
          alt="戻る"
          className={styles.back_btn__img}
        />
      </button>
      <div className={styles.header__logo}>
        <Link href="/">
          <a className={styles.header__logo_link}>
            <img
              src="/images/side_logo.svg"
              alt="Medii E-コンサル"
              className={styles.header__logo_item}
            />
          </a>
        </Link>
      </div>

      <HeaderMenu />
      <HeaderSubMenu />
    </HeaderContainer>
  );
};
