import React, { useState } from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { UserConsultNoContents } from './UserConsultNoContents';

export const UserConsult = () => {
  const [activeTab, setActiveTab] = useState<'question' | 'answer'>('question');
  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          あなたに関わるE-コンサル
        </p>
        <div className="hidden whitespace-nowrap lg:block">
          <PrimaryButton size="large">新規E-コンサルを作成</PrimaryButton>
        </div>
        <div className="ml-2 hidden whitespace-nowrap lg:block">
          <TertiaryButton size="large">E-コンサルの使い方</TertiaryButton>
        </div>
      </div>

      <StyledHiddenScrollBar className="mt-5 flex items-end overflow-y-hidden overflow-x-scroll">
        <TopTab
          text="自分が質問"
          isActive={activeTab === 'question'}
          onClick={() => {
            setActiveTab('question');
          }}
        />
        <TopTab
          text="自分が回答"
          isActive={activeTab === 'answer'}
          onClick={() => {
            setActiveTab('answer');
          }}
          isLast
        />
        <div className="w-auto border-b" />
      </StyledHiddenScrollBar>
      {/* <UserConsultNoContents /> */}
      <div className="flex h-28 items-center border-b border-border-divider p-4">
        <div className="w-5/6">
          <p className="text-l font-bold">経管栄養について質問</p>
          <p className="truncate text-md text-text-secondary">
            お世話になっております。栄養管理について相談です。70台男性、H158cm,
            W 37kg, BMI 14.7 入院前は仕事をされ、生活自立。 W 37kg, BMI 14.7
            入院前は仕事をされ、生活自立。
          </p>

          <div className="mt-2 flex">
            <p
              className="h-6 w-10 whitespace-nowrap rounded-full bg-medii-sky-base
           px-2 py-0.5 text-center text-medii-sm text-white"
            >
              新着
            </p>
            <p className="test-md ml-2 font-bold text-text-secondary">
              回答医を探しています
            </p>
            <p className="test-md text-text-secondary">・</p>
            <p className="test-md text-text-secondary">10分前</p>
          </div>
        </div>
        <div className="mx-auto">
          <TertiaryButton size="medium">相談を見る</TertiaryButton>
        </div>
      </div>
    </>
  );
};
