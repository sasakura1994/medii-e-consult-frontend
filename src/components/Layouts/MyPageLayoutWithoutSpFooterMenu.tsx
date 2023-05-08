import React from 'react';
import styles from './MyPageLayout.module.scss';
import { Header } from '@/components/Layouts/Header/Header';

type PropsType = {
  children: React.ReactNode;
};

export const MyPageLayoutWithoutSpFooterMenu = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <Header />
      <div className={styles.mypage_layout}>
        <main className={styles.mypage_container}>{children}</main>
      </div>
    </>
  );
};
