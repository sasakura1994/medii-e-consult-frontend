import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const HeaderMenuContainer: React.FC<Props> = ({ children }: Props) => {
  return <nav className="hidden lg:block">{children}</nav>;
};
