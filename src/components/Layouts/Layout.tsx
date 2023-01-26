import React from 'react';
import { Header } from './Header';
import { HeaderSimple } from './HeaderSimple';
import { SpFooterMenu } from '@/components/Commons/SpFooterMenu';

type HeaderFigureType = 'default' | 'simple';

type PropsType = {
  children: React.ReactNode;
  headerFigure?: HeaderFigureType;
};

export const Layout = (props: PropsType) => {
  const { children, headerFigure } = props;

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
      <SpFooterMenu />
    </>
  );
};
