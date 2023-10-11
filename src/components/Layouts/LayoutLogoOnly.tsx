import React from 'react';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { HeaderLogoOnly } from './Header/HeaderLogoOnly';

type PropsType = {
  children: React.ReactNode;
};

export const LayoutLogoOnly = (props: PropsType) => {
  const { children } = props;
  useAuthenticationOnPage();

  return (
    <>
      <HeaderLogoOnly />
      <main className="bg-white">{children}</main>
    </>
  );
};
