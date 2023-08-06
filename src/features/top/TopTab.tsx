import React, { MouseEventHandler } from 'react';

type TopTabType = {
  text: string;
  unreadCount: number;
  isActive: boolean;
  isLast?: boolean;
  onClick: MouseEventHandler;
};

export const TopTab = (props: TopTabType) => {
  const { text, unreadCount, isActive, isLast, onClick } = props;

  return (
    <>
      <div
        onClick={onClick}
        className={`flex w-auto cursor-pointer items-center rounded-t-lg border-x border-t px-6 py-3 ${
          isActive ? 'h-12 bg-white' : 'h-10 border-b bg-bg-secondary'
        }`}
      >
        <p className={`whitespace-nowrap  text-md font-bold ${isActive ? 'text-text-primary' : 'text-monotone-400'}`}>
          {text}
        </p>
        {unreadCount > 0 && (
          <p
            className="ml-1 flex aspect-square h-4 items-center justify-center rounded-full bg-medii-blue-base p-2.5
            text-medii-sm font-bold text-white"
          >
            {unreadCount}
          </p>
        )}
      </div>
      {isLast ? <div className="flex-grow border-b" /> : <div className="w-1 border-b" />}
    </>
  );
};
