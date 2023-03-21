import React from 'react';
import styles from './Header.module.scss';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { useRouter } from 'next/router';
import { RegistrationHeaderMenu } from '@/components/Layouts/Header/RegistrationHeaderMenu';

export const RegistrationHeader: React.FC = () => {
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

      <RegistrationHeaderMenu />
    </HeaderContainer>
  );
};
