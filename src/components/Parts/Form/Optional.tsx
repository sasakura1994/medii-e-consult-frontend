import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Optional = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex h-5 items-center justify-center rounded bg-bg-secondary px-1 text-xs font-light text-caption">
      {children}
    </div>
  );
};
