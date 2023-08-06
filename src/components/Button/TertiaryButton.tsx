import React from 'react';
import Button, { ButtonProps } from './Button';

type TertiaryProps = ButtonProps;

const TertiaryButton = (props: TertiaryProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      className={`
        bg-white
        text-black
        disabled:text-text-disabled
        ${className ?? ''}
      `}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default TertiaryButton;
