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
      <div className="h-full min-h-screen w-full bg-[#eff3f6]">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};
