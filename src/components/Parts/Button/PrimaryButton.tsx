import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const PrimaryButton: React.FC<Props> = ({
  children,
  className,
  onClick,
  dataTestId,
  type,
}: Props) => {
  return (
    <button
      type={type}
      className={`
        mx-auto
        block
        rounded-full
        bg-primary
        py-2
        px-8
        font-bold
        text-white
        drop-shadow-button
        ${className}
      `}
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
