import React from 'react';
import { TopToolTip } from './TopToolTip';
import SecondaryButton from '@/components/Button/SecondaryButton';
export const UserConsultNoContents = () => {
  return (
    <div className="mt-2 h-[336px] w-full rounded-lg border">
      <div className="mt-6 flex justify-center space-x-1">
        <TopToolTip text="全診療科対応" />
        <TopToolTip text="完全無料" />
        <TopToolTip text="匿名で質問できる" />
      </div>
      <p className="mt-2 text-center text-xxl font-bold text-text-primary">
        1,000名以上の専門医に臨床疑問を相談してみませんか？
      </p>
      <div className="mt-6 flex justify-center">
        <img src="images/top/top-consult.png" alt="" />
      </div>
      <div className="mt-6 flex justify-center">
        <SecondaryButton size="large">E-コンサルを始める</SecondaryButton>
      </div>
    </div>
  );
};
