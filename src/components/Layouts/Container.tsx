import React from 'react';

type PropsType = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export const Container: React.FC<PropsType> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};
