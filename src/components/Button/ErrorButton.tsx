import React from 'react';
import Button, { ButtonProps } from './Button';

type Props = ButtonProps;

const ErrorButton = (props: Props) => {
  const { children, className, ...otherProps } = props;

  return (
    <Button
      className={`
        bg-distructive
        text-white
        hover:bg-distructive-hover
        active:bg-distructive-hover
        disabled:bg-button-disabled
        ${className ?? ''}
      `}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default ErrorButton;
