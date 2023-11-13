import React from 'react';

type Props = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

export const GroupDetailModalLabelAndValue: React.FC<Props> = ({ label, className, children }: Props) => {
  return (
    <div className={className}>
      <div className="text-block-gray">{label}</div>
      <div>{children}</div>
    </div>
  );
};
