import React from 'react';
import { HeaderLogoOnly } from './Header/HeaderLogoOnly';

type PropsType = {
  children: React.ReactNode;
};

export const ProfileRegistrationLayout = (props: PropsType) => {
  const { children } = props;

  return (
    <div className="h-full min-h-screen w-full bg-bg">
      <HeaderLogoOnly />
      <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">{children}</main>
    </div>
  );
};
