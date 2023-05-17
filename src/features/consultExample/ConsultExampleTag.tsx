import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ConsultExampleTag: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="inline-block rounded bg-primary-light px-4 py-2 text-sm">
      {children}
    </div>
  );
};
