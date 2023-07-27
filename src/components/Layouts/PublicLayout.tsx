import React from 'react';
import { HeaderSimple } from './Header/HeaderSimple';

type PropsType = {
  children: React.ReactNode;
};

export const PublicLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <div className="h-full min-h-screen w-full bg-bg">
      <HeaderSimple />
      <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">{children}</main>
    </div>
  );
};
