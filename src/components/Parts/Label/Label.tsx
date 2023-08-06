import React from 'react';

type LabelProps = {
  text: string;
  color?: 'primaryBlue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
  dataTestId?: string;
};

const Label = (props: LabelProps) => {
  const { text, color = 'primaryBlue', className, size = 'md', dataTestId } = props;

  return (
    <p
      className={`mx-auto my-auto w-auto rounded-md px-2 text-center ${
        size === 'md' ? 'py-1 text-md font-semibold' : 'py-[2px] text-medii-sm font-light'
      } ${color === 'gray' ? 'bg-[#EDEDED] text-text-secondary ' : 'bg-medii-blue-100 text-medii-blue-base'} ${
        className ?? ''
      }`}
      data-testid={dataTestId}
    >
      {text}
    </p>
  );
};

export default Label;
