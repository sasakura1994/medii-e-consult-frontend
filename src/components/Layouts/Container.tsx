import React from 'react';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<PropsType> = (props) => {
  const { children, className } = props;
  return <div className={`mx-auto lg:w-[644px] ${className}`}>{children}</div>;
};
