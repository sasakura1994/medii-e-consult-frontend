import React from 'react';
import { HeaderSimple } from './Header/HeaderSimple';
import { Footer } from './Footer/Footer';

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
