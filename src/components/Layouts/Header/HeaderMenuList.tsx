import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const HeaderMenuList: React.FC<Props> = ({ children }: Props) => {
  return <ul className="ml-10 flex">{children}</ul>;
};
