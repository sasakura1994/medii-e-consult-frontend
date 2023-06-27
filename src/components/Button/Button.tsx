import React from 'react';

export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    onClick,
    size = 'medium',
    disabled = false,
  } = props;

  const bottunSizes: { [key: string]: string } = {
    small: 'h-6 text-medii-sm font-bold',
    medium: 'h-9 text-md font-bold',
    large: 'h-11 text-md font-semibold',
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
