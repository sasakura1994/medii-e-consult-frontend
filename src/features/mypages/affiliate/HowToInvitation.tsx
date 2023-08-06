import React from 'react';

type HowToInvitationProps = {
  number: number;
  text: string;
};

export const HowToInvitation = (props: HowToInvitationProps) => {
  const { number, text } = props;
  return (
    <div className="mt-4 flex space-x-4">
      <div
        className="flex aspect-square h-8 w-8 items-center justify-center rounded-full
    border border-border-selected"
      >
        <p className="text-l font-bold text-text-link">{number}</p>
      </div>
      <p className="text-md text-text-primary">{text}</p>
    </div>
  );
};
