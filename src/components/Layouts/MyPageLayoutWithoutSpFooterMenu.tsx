import React from 'react';
import { Header } from '@/components/Layouts/Header/Header';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';

type PropsType = {
  children: React.ReactNode;
};

export const MyPageLayoutWithoutSpFooterMenu = (props: PropsType) => {
  const { children } = props;
  useAuthenticationOnPage();

  return (
    <div className="h-full min-h-screen w-full bg-bg">
      <Header />
      <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">{children}</main>
    </div>
  );
};
