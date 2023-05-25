import React from 'react';
type DefaultButtonProps = {
  variant?: 'outline' | 'solid';
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const DefaultButton = (props: DefaultButtonProps) => {
  const { variant = 'solid', width = 'auto', children, onClick } = props;
  const buttonClass =
    variant === 'outline'
      ? 'border-gray-300 bg-white text-black'
      : 'bg-medii-blue text-white';

  const buttonWidth = `w-${width}`;

  return (
    <button
      className={`my-auto flex items-center justify-center
      rounded-md border px-3 py-2 font-bold ${buttonWidth} ${buttonClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
