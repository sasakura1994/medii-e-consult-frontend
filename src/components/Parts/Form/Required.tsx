import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  isInline?: boolean;
};

export const Required = (props: Props) => {
  const { children, className, isInline = false } = props;
  return (
    <div
      className={`
        ${isInline ? 'inline-block' : 'flex'} h-5 items-center justify-center whitespace-nowrap rounded
        bg-medii-red-100 px-1 text-xs font-light text-alert
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
};
