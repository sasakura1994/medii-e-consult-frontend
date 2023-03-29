import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const NewChatRoomFormLabel: React.FC<Props> = (props: Props) => {
  return <div className={`font-bold ${props.className}`}>{props.children}</div>;
};
