import React, { ReactNode } from 'react';

type LabelProps = {
  children: ReactNode;
  color?: 'primaryBlue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
  dataTestId?: string;
};

const Label = (props: LabelProps) => {
  const { children, color = 'primaryBlue', className, size = 'md', dataTestId } = props;

  return (
    <p
      className={`my-auto w-auto items-center rounded-md px-2 text-center ${
        size === 'md' ? 'py-1 text-md font-semibold' : 'py-[2px] text-medii-sm font-light'
      } ${color === 'gray' ? 'bg-bg-secondary text-caption ' : 'bg-medii-blue-100 text-medii-blue-base'} ${
        className ?? ''
      }`}
      data-testid={dataTestId}
    >
      {children}
    </p>
  );
};

export default Label;
