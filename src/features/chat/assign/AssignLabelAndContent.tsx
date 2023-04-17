import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const AssignLabelAndContent: React.FC<Props> = ({
  label,
  children,
  className,
}: Props) => {
  return (
    <div className={className}>
      <div className="font-bold">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
};
