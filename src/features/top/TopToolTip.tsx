import React from 'react';

type TopToolTipProps = {
  text: string;
};

export const TopToolTip = (props: TopToolTipProps) => {
  const { text } = props;
  return (
    <div className="flex h-6 items-center rounded-full bg-medii-blue-100 py-1 px-3">
      <p className="text-medii-sm font-bold text-text-link lg:text-md">
        {text}
      </p>
    </div>
  );
};
