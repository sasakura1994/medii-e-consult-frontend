import React from 'react';

type Props = {
  disabled?: boolean;
};

export const RegistrationProgressLine = (props: Props) => {
  const { disabled = false } = props;

  return (
    <div
      className={`border-b ${disabled ? 'border-monotone-400' : 'border-medii-blue-base'} w-[88px] lg:w-[112px]`}
    ></div>
  );
};
