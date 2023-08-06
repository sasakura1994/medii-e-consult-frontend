import React from 'react';

type TopClockHistoryProps = {
  children: React.ReactNode;
};

export const TopClockHistory = (props: TopClockHistoryProps) => {
  const { children } = props;
  return (
    <div className="flex items-center">
      <img src="icons/clock-history.svg" alt="" />
      {children}
    </div>
  );
};
