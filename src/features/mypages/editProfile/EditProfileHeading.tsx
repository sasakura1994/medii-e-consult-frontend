import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export const EditProfileHeading = (props: Props) => {
  const { className, children } = props;

  return <h3 className={`text-primary ${className ?? ''}`}>■ {children}</h3>;
};
