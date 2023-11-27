import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ConsultExampleTag: React.FC<Props> = ({ children }: Props) => {
  return <div className="inline-block rounded bg-primary-light px-2 py-2 text-sm lg:px-4">{children}</div>;
};
