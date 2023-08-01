import React, { MouseEventHandler } from 'react';

type TopTabType = {
  text: string;
  isActive: boolean;
  isLast?: boolean;
  onClick: MouseEventHandler;
};

export const TopTab = (props: TopTabType) => {
  const { text, isActive, isLast, onClick } = props;

  return (
    <>
      <div
        onClick={onClick}
        className={`w-auto cursor-pointer rounded-t-lg border-x border-t ${
          isActive ? 'h-12 bg-white' : 'h-10 border-b bg-bg-secondary'
        }`}
      >
        <p
          className={`whitespace-nowrap px-6 py-3 text-md font-bold ${
            isActive ? 'text-text-primary' : 'text-monotone-400'
          }`}
        >
          {text}
        </p>
      </div>
      {isLast ? (
        <div className="flex-grow border-b" />
      ) : (
        <div className="w-1 border-b" />
      )}
    </>
  );
};
