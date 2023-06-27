import React from 'react';

type TertiaryProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: 'sm' | 'medium';
  disabled?: boolean;
};

const TertiaryButton = (props: TertiaryProps) => {
  const { width, children, onClick, size, disabled = false } = props;

  const buttonWidth = width ? width : 'w-auto';
  const bottunSize = size === 'sm' ? 'h-9 text-medii-sm' : 'h-11 text-md';

  return (
    <button
      className={`flex items-center justify-center rounded-md border bg-white px-3 font-bold
      text-black disabled:text-text-disabled ${buttonWidth} ${bottunSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
