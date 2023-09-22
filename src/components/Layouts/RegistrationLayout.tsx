import React from 'react';
import { HeaderSimple } from './Header/HeaderSimple';
import { Footer } from './Footer/Footer';

type PropsType = {
  children: React.ReactNode;
};

export const RegistrationLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-[#eff3f6]">
      <HeaderSimple />
      <main className="flex-grow bg-[url('/images/registration/bg.png')] bg-cover md:py-10">{children}</main>
      <Footer />
    </div>
  );
};
