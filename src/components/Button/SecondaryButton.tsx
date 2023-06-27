import React from 'react';

type SecondaryProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: 'sm' | 'medium';
  disabled?: boolean;
};

const SecondaryButton = (props: SecondaryProps) => {
  const { width, children, onClick, size, disabled = false } = props;

  const buttonWidth = width ? `w-${width}` : 'w-auto';
  const bottunSize = size === 'sm' ? 'h-9 text-medii-sm' : 'h-11 text-md';
  return (
    <button
      className={`flex items-center justify-center rounded-md border border-medii-blue-base
        bg-white px-3 font-bold text-medii-blue-base
        hover:bg-medii-blue-100 active:bg-medii-blue-100 disabled:bg-white
      ${buttonWidth} ${bottunSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
