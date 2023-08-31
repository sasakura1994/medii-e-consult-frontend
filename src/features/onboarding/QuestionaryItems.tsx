import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  itemCount: number;
};

export const QuestionaryItems = (props: Props) => {
  const { children, itemCount } = props;

  if (itemCount <= 2) {
    return <div className="mt-2 flex gap-4 text-md">{children}</div>;
  }

  return <div className="mt-2 flex flex-col items-start gap-1 text-md">{children}</div>;
};
