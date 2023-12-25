import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  itemCount: number;
};

export const QuestionaryItems = (props: Props) => {
  const { children } = props;

  return <div className="mt-2 flex flex-col items-start gap-2 text-md">{children}</div>;
};
