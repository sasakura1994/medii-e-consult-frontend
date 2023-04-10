import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const OutlinedSquareButton: React.FC<Props> = ({
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
        inline-block
        rounded
        border
        border-solid
        border-[#999999]
        bg-white
        px-2
        py-1
        text-sm
        ${className}
      `}
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
