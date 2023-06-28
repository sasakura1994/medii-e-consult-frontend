import React from 'react';

export const TopClockHistory = () => {
  return (
    <div className="flex items-center">
      <img src="icons/clock-history.svg" alt="" />
      <p className="ml-1 text-medii-sm text-text-primary">
        初回回答まで
        <span className="text-sm font-bold text-text-link">1時間14分</span>
        （2時間前に質問）
      </p>
    </div>
  );
};
