import React from 'react';
import styles from './MyPageLayout.module.scss';
import { HeaderSimple } from './HeaderSimple';

type PropsType = {
  children: React.ReactNode;
};

export const PublicLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <HeaderSimple />
      <div className={styles.mypage_layout}>
        <main className={styles.mypage_container}>{children}</main>
      </div>
    </>
  );
};
