import React from 'react';
import styles from './Header.module.scss';
import { HeaderMenu } from '@/components/Layouts/Header/HeaderMenu';
import { HeaderSubMenu } from '@/components/Layouts/Header/HeaderSubMenu';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <div className="flex items-center">
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
        <HeaderMenu />
      </div>

      <HeaderSubMenu />
    </HeaderContainer>
  );
};
