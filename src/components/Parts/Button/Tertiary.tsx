import React from 'react';
type TertiaryProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: 'large' | 'medium';
  disabled?: boolean;
};

const Tertiary = (props: TertiaryProps) => {
  const { width, children, onClick, size, disabled = false } = props;

  const buttonWidth = width ? width : 'w-auto';
  const bottunSize = size === 'large' ? 'h-11 text-md' : 'h-9 text-sm';

  return (
    <button
      className={`m-auto flex items-center justify-center rounded-md border bg-white px-3 font-bold
      text-black disabled:text-monotone-200 ${buttonWidth} ${bottunSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Tertiary;
