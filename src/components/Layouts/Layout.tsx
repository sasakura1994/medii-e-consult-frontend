import React from 'react';
import { Header } from '@/components/Layouts/Header/Header';
import { HeaderSimple } from '@/components/Layouts/Header/HeaderSimple';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { FooterSpMenu } from './Footer/FooterSpMenu';

type HeaderFigureType = 'default' | 'simple';

type PropsType = {
  children: React.ReactNode;
  headerFigure?: HeaderFigureType;
};

export const Layout = (props: PropsType) => {
  const { children, headerFigure } = props;
  useAuthenticationOnPage();

  return (
    <>
      {!headerFigure || headerFigure === 'default' ? (
        <Header />
      ) : headerFigure === 'simple' ? (
        <HeaderSimple />
      ) : (
        <Header />
      )}
      <main>{children}</main>
      <FooterSpMenu />
    </>
  );
};
