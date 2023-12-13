import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  isInline?: boolean;
};

export const Optional = (props: Props) => {
  const { children, className, isInline = false } = props;
  return (
    <div
      className={`
        ${isInline ? 'inline-flex' : 'flex'} h-5 items-center justify-center whitespace-nowrap rounded
        bg-bg-secondary px-1 text-xs font-light text-caption
        ${className ?? ''}
        `}
    >
      {children}
    </div>
  );
};
