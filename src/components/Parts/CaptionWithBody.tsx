import React, { ReactNode } from 'react';

type PropsType = {
  caption: string;
  className?: string;
  children: ReactNode;
};

export const CaptionWithBody: React.FC<PropsType> = (props) => {
  const { caption, children, className } = props;

  return (
    <div className={className}>
      <div className="mb-2 text-[#999999]">{caption}</div>
      <div>{children}</div>
    </div>
  );
};
