import React from 'react';
import TertiaryButton from '@/components/Button/Tertiary';
import PrimaryButton from '@/components/Button/Primary';
import { TopTab } from './TopTab';
export const UserConsult = () => {
  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          E-コンサルで質問する
        </p>
        <div className="hidden lg:block">
          <PrimaryButton>新規E-コンサルを作成</PrimaryButton>
        </div>
        <div className="ml-2 hidden lg:block">
          <TertiaryButton>E-コンサルの使い方</TertiaryButton>
        </div>
      </div>

      <div className="mt-5 flex items-end">
        <TopTab text="自分が質問" isActive={false} />
        <TopTab text="回答医 募集中" isActive />
        <TopTab text="自分が回答" isActive={false} isLast />
        <div className="w-auto border-b" />
      </div>
    </>
  );
};
