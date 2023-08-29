import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BreadcrumbItem = (props: Props) => {
  const { children } = props;

  return <div className="text-medii-sm font-light text-secondary">{children}</div>;
};
