import React from 'react';
import Button, { ButtonProps } from './Button';

type SecondaryProps = ButtonProps;

const SecondaryButton = (props: SecondaryProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      className={`
        border-medii-blue-base
        bg-white
        text-medii-blue-base
        hover:bg-medii-blue-100
        active:bg-medii-blue-100
        disabled:bg-white
        ${className ?? ''}
      `}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
