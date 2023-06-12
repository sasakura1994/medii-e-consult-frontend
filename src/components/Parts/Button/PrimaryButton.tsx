import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
  size?: 'lg';
  type?: 'button' | 'submit' | 'reset';
};

export const PrimaryButton: React.FC<Props> = ({
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
        ${className?.match(/rounded/) ? '' : 'rounded-full'}
        bg-primary
        ${size === 'lg' ? 'py-[14px]' : 'py-2'}
        ${className?.match(/px-/) ? '' : 'px-8'}
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
