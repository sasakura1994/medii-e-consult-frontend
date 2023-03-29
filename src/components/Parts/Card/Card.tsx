import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div
      className={`
        rounded
        border
        border-[#d5d5d5]
        bg-[#ffffff]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
