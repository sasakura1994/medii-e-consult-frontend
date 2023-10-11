import React from 'react';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { HeaderLogoOnly } from './Header/HeaderLogoOnly';

type PropsType = {
  children: React.ReactNode;
  isPublicPage: boolean;
};

export const LayoutLogoOnly = (props: PropsType) => {
  const { children, isPublicPage } = props;
  useAuthenticationOnPage();

  return (
    <>
      <HeaderLogoOnly isPublicPage = {isPublicPage} />
      <main className="bg-white">{children}</main>
    </>
  );
};
