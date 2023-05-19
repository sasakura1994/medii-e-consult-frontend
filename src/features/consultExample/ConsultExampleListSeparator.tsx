import React from 'react';

type Props = {
  className?: string;
};

export const ConsultExampleListSeparator: React.FC<Props> = ({
  className,
}: Props) => {
  return <div className={`my-4 h-px bg-[#dcdcdc] ${className || ''}`}></div>;
};
