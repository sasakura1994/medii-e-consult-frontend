import React from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { TopToolTip } from './TopToolTip';
import SecondaryButton from '@/components/Button/SecondaryButton';
export const UserConsult = () => {
  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          E-コンサルで質問する
        </p>
        <div className="hidden lg:block">
          <PrimaryButton size="large">新規E-コンサルを作成</PrimaryButton>
        </div>
        <div className="ml-2 hidden lg:block">
          <TertiaryButton size="large">E-コンサルの使い方</TertiaryButton>
        </div>
      </div>

      <StyledHiddenScrollBar className="mt-5 flex items-end overflow-y-hidden overflow-x-scroll">
        <TopTab text="自分が質問" isActive={false} />
        <TopTab text="回答医 募集中" isActive />
        <TopTab text="自分が回答" isActive={false} isLast />
        <div className="w-auto border-b" />
      </StyledHiddenScrollBar>
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
    </>
  );
};
