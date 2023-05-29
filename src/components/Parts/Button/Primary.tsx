import React from 'react';
type PrimaryProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: 'large' | 'medium';
  disabled?: boolean;
};

const Primary = (props: PrimaryProps) => {
  const { width, children, onClick, size, disabled = false } = props;

  const buttonWidth = width ? `w-${width}` : 'w-auto';
  const bottunSize = size === 'large' ? 'h-11 text-md' : 'h-9 text-sm';
  return (
    <button
      className={`m-auto flex items-center justify-center rounded-md border bg-medii-blue-base px-3 font-bold text-white
      hover:bg-button-color-hover active:bg-button-color-active disabled:bg-button-color-disabled
      ${buttonWidth} ${bottunSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Primary;
