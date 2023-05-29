import React from 'react';
import { Header } from '@/components/Layouts/Header/Header';
import { FooterSpMenu } from '@/components/Commons/FooterSpMenu';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';

type PropsType = {
  children: React.ReactNode;
};

export const MyPageLayout = (props: PropsType) => {
  const { children } = props;
  useAuthenticationOnPage();

  return (
    <>
      <Header />
      <div className={'h-full min-h-screen w-full bg-[#eff3f6]'}>
        <main className={'mx-auto pt-10 pb-20 lg:w-lg-breakpoint lg:pb-0'}>
          {children}
        </main>
      </div>
      <FooterSpMenu />
    </>
  );
};
