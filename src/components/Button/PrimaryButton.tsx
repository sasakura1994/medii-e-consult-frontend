import React from 'react';
import Button, { ButtonProps } from './Button';

type PrimaryProps = ButtonProps;

const PrimaryButton = (props: PrimaryProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      className={`
        bg-medii-blue-base
        text-white
        hover:bg-button-hover
        active:bg-button-active
        disabled:bg-button-disabled
        ${className ?? ''}
      `}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
