import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
  size?: 'lg';
  type?: 'button' | 'submit' | 'reset';
};

export const GrayButton: React.FC<Props> = ({
  children,
  className,
  onClick,
  dataTestId,
  size,
  type,
}: Props) => {
  return (
    <button
      type={type}
      className={`
        block
        rounded-full
        bg-block-gray
        ${size === 'lg' ? 'py-[14px]' : 'py-2'}
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
