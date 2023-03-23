import React from 'react';
import styles from './MyPageLayout.module.scss';
import { FooterSpMenu } from '@/components/Commons/FooterSpMenu';
import { HeaderSimple } from './Header/HeaderSimple';

type PropsType = {
  children: React.ReactNode;
};

export const RegistrationLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <HeaderSimple />
      <div className={styles.mypage_layout}>
        <main>{children}</main>
      </div>
    </>
  );
};
