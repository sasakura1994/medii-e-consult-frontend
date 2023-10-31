import React from 'react';
import { HeaderLogoOnly } from './Header/HeaderLogoOnly';

type PropsType = {
  children: React.ReactNode;
};

export const LayoutLogoOnly = (props: PropsType) => {
  const { children } = props;

  return (
    <>
      <HeaderLogoOnly />
      <main className="bg-white">{children}</main>
    </>
  );
};
