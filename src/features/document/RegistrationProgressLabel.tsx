import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

export const RegistrationProgressLabel = (props: Props) => {
  const { children, disabled } = props;

  return (
    <div className={`w-[118px] text-center lg:w-[128px] ${disabled ? 'text-monotone-400' : 'text-medii-blue-base'}`}>
      {children}
    </div>
  );
};
