import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const NewChatRoomConfirmationLabel: React.FC<Props> = (props: Props) => {
  return <div className={`text-sm text-block-gray ${props.className}`}>{props.children}</div>;
};
