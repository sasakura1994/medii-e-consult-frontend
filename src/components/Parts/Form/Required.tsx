import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Required = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex h-5 items-center justify-center rounded bg-medii-red-100 px-1 text-xs font-light text-alert">
      {children}
    </div>
  );
};
