import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

export const RegistrationProgressNumber = (props: Props) => {
  const { children, disabled = false } = props;

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full ${
        disabled ? 'border border-monotone-400 text-monotone-400' : 'bg-medii-blue-base text-white'
      }`}
    >
      <div>{children}</div>
    </div>
  );
};
