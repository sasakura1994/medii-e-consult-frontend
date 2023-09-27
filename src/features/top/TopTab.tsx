import React, { MouseEventHandler } from 'react';

type TopTabType = {
  text: string;
  isExistUnread: boolean;
  isActive: boolean;
  isLast?: boolean;
  onClick: MouseEventHandler;
};

export const TopTab = (props: TopTabType) => {
  const { text, isExistUnread, isActive, isLast, onClick } = props;

  return (
    <>
      <div
        onClick={onClick}
        className={`flex w-auto cursor-pointer items-center rounded-t-lg border-x border-t px-6 py-3 ${
          isActive ? 'h-12 bg-white' : 'h-10 border-b bg-bg-secondary'
        }`}
      >
        {isExistUnread && <div className="mr-1 aspect-square h-2 w-2 rounded-full bg-medii-sky-base" />}
        <p className={`whitespace-nowrap  text-md font-bold ${isActive ? 'text-text-primary' : 'text-monotone-400'}`}>
          {text}
        </p>
      </div>
      {isLast ? <div className="flex-grow border-b" /> : <div className="w-1 border-b" />}
    </>
  );
};
