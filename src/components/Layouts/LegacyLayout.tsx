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

export const LegacyLayout = (props: PropsType) => {
  const { children, headerFigure } = props;
  useAuthenticationOnPage();

  return (
    <div className="h-full min-h-screen w-full bg-bg pb-16 lg:pb-0">
      {!headerFigure || headerFigure === 'default' ? (
        <Header />
      ) : headerFigure === 'simple' ? (
        <HeaderSimple />
      ) : (
        <Header />
      )}
      <main>{children}</main>
      <FooterSpMenu />
    </div>
  );
};
