import React from 'react';

type PrimaryProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: 'medium' | 'sm';
  disabled?: boolean;
};

const PrimaryButton = (props: PrimaryProps) => {
  const { width, children, onClick, size, disabled = false } = props;

  const buttonWidth = width ? `w-${width}` : 'w-auto';
  const bottunSize = size === 'sm' ? 'h-9 text-medii-sm' : 'h-11 text-md';
  return (
    <button
      className={`flex items-center justify-center rounded-md border bg-medii-blue-base px-3 font-bold text-white
      hover:bg-button-hover active:bg-button-active disabled:bg-button-disabled
      ${buttonWidth} ${bottunSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
