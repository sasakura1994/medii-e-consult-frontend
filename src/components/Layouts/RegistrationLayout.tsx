import React from 'react';
import styles from './MyPageLayout.module.scss';
import { FooterSpMenu } from '@/components/Commons/FooterSpMenu';
import { HeaderSimple } from './Header/HeaderSimple';
import { Footer } from '../Commons/Footer';

type PropsType = {
  children: React.ReactNode;
};

export const RegistrationLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <HeaderSimple />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
