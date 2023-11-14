import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const SearchGroupModalLabelAndInput: React.FC<Props> = ({ children, className, label }: Props) => {
  return (
    <div className={className}>
      <div className="font-bold">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
};
