import React from 'react';
import { Header } from '@/components/Layouts/Header/Header';
import { HeaderSimple } from '@/components/Layouts/Header/HeaderSimple';
import { FooterSpMenu } from '@/components/Commons/FooterSpMenu';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { HeaderLogoOnly } from './Header/HeaderLogoOnly';

type HeaderFigureType = 'default' | 'simple' | 'logoOnly';

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
        <>
          <Header />
          <main>{children}</main>
          <FooterSpMenu />
        </>
      ) : headerFigure === 'simple' ? (
        <>
          <HeaderSimple />
          <main>{children}</main>
          <FooterSpMenu />
        </>
      ) : headerFigure === 'logoOnly' ? (
        <>
          <HeaderLogoOnly />
          <main>{children}</main>
        </>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <FooterSpMenu />
        </>
      )}
    </>
  );
};
