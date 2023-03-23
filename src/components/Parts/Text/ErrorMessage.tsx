import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ErrorMessage: React.FC<Props> = ({
  children,
  className,
}: Props) => {
  return <div className={`font-bold text-error ${className}`}>{children}</div>;
};
