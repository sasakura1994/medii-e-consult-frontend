import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  spNoBorder?: boolean;
};

export const Card: React.FC<Props> = ({
  children,
  className,
  spNoBorder = false,
}: Props) => {
  return (
    <div
      className={`
        ${spNoBorder ? 'lg:rounded lg:border' : 'rounded border'}
        border-[#d5d5d5]
        bg-[#ffffff]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
