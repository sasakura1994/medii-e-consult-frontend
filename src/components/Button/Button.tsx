import React from 'react';

export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonProps = {
  width?: string;
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {
    width,
    children,
    className,
    onClick,
    size = 'medium',
    disabled = false,
  } = props;

  const buttonWidth = width ? `w-${width}` : 'w-auto';
  const bottunSizes: { [key: string]: string } = {
    small: 'h-6 text-medii-sm',
    medium: 'h-9 text-md',
    large: 'h-11 text-md',
  };
  return (
    <button
      className={`
        flex
        items-center
        justify-center
        rounded-md
        border
        px-3
        font-bold
        ${buttonWidth}
        ${bottunSizes[size]}
        ${className ?? ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
