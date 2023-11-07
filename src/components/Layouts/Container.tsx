import React from 'react';

type PropsType = {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
};

export const Container: React.FC<PropsType> = (props) => {
  const { children, className, dataTestId } = props;
  return (
    <div className={`mx-auto lg:w-[644px] ${className}`} data-testid={dataTestId}>
      {children}
    </div>
  );
};
