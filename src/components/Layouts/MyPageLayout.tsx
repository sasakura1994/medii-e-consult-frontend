import React from 'react';
import styles from './MyPageLayout.module.scss';
import { Header } from '@/components/Layouts/Header/Header';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { FooterSpMenu } from './Footer/FooterSpMenu';

type PropsType = {
  children: React.ReactNode;
};

export const MyPageLayout = (props: PropsType) => {
  const { children } = props;
  useAuthenticationOnPage();

  return (
    <>
      <Header />
      <div className={styles.mypage_layout}>
        <main className={styles.mypage_container}>{children}</main>
      </div>
      <FooterSpMenu />
    </>
  );
};
