import React from 'react';
import styles from './MyPageLayout.module.scss';
import { FooterSpMenu } from '@/components/Commons/FooterSpMenu';
import { RegistrationHeader } from './Header/RegistrationHeader';

type PropsType = {
  children: React.ReactNode;
};

export const RegistrationLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <RegistrationHeader />
      <div className={styles.mypage_layout}>
        <main>{children}</main>
      </div>
      <FooterSpMenu />
    </>
  );
};
