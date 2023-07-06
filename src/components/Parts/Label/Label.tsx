import React from 'react';

type LabelProps = {
  text: string;
  color?: 'primaryBlue' | 'gray';
  className?: string;
};

const Label = (props: LabelProps) => {
  const { text, color, className } = props;

  return (
    <p
      className={
        `my-auto w-auto rounded-md px-2 py-1 text-center text-medii-sm ` +
          (color === 'gray'
            ? 'bg-[#EDEDED] text-text-secondary '
            : 'bg-medii-blue-100 text-medii-blue-base ') +
          className ?? ''
      }
    >
      {text}
    </p>
  );
};

export default Label;
