import React from 'react';

export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  dataTestId?: string;
};

const Button = (props: ButtonProps) => {
  const { children, className, onClick, size = 'medium', disabled = false, type, dataTestId } = props;

  const bottunSizes: { [key: string]: string } = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
  };
  return (
    <button
      type={type}
      data-testid = {dataTestId}
      className={`
        flex
        items-center
        justify-center
        rounded-md
        border
        px-3
        text-md
        font-bold
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
