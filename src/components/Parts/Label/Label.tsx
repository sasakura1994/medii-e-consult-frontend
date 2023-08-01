import React from 'react';

type LabelProps = {
  text: string;
  color?: 'primaryBlue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
};

const Label = (props: LabelProps) => {
  const { text, color = 'primaryBlue', className, size = 'md' } = props;

  return (
    <p
      className={`my-auto w-auto rounded-md px-2 text-center ${
        size === 'md' ? 'py-1 text-md font-semibold' : 'py-[2px] text-medii-sm font-light'
      } ${color === 'gray' ? 'bg-[#EDEDED] text-text-secondary ' : 'bg-medii-blue-100 text-medii-blue-base'} ${
        className ?? ''
      }`}
    >
      {text}
    </p>
  );
};

export default Label;
