import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const DoctorProfileModalLabelAndValue: React.FC<Props> = ({
  children,
  className,
  label,
}: Props) => {
  return (
    <div className={className}>
      <div className="text-block-gray">{label}</div>
      <div>{children}</div>
    </div>
  );
};
