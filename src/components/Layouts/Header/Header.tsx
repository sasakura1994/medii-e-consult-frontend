import React from 'react';
import styles from './Header.module.scss';
import { HeaderMenu } from '@/components/Layouts/Header/HeaderMenu';
import { HeaderSubMenu } from '@/components/Layouts/Header/HeaderSubMenu';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { useRouter } from 'next/router';
import { RegistrationHeaderMenu } from '@/components/Layouts/Header/RegistrationHeaderMenu';

export const Header: React.FC = () => {
  const router = useRouter();
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
      <HeaderLogo />

      {router.pathname === '/registration' ? (
        <RegistrationHeaderMenu />
      ) : (
        <HeaderMenu />
      )}
      {router.pathname === '/registration' ? null : <HeaderSubMenu />}
    </HeaderContainer>
  );
};
