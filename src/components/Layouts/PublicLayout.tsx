import React from 'react';
import { HeaderSimple } from './Header/HeaderSimple';

type PropsType = {
  children: React.ReactNode;
};

export const PublicLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <HeaderSimple />
      <div className={'h-full min-h-screen w-full bg-[#eff3f6]'}>
        <main className={'mx-auto pt-10 pb-20 lg:w-lg-breakpoint lg:pb-0'}>
          {children}
        </main>
      </div>
    </>
  );
};
