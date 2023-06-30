import SecondaryButton from '@/components/Button/SecondaryButton';
import React from 'react';
import { TopArticle } from './TopArticle';
import { TopRightItem } from './TopRightItem';
import { StyledHiddenScrollBar } from './styled';
import { UserConsult } from './UserConsult';
import { TopItem } from './TopItem';
import { TopNotifications } from './TopNotifications';
import { TopNews } from './TopNews';

export const Top = () => {
  return (
    <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:pb-0">
      <div className="lg:flex-grow">
        <TopNotifications />
        <UserConsult />
        <StyledHiddenScrollBar className="mt-10 flex items-center">
          <p className="flex-grow text-xxl font-bold text-text-primary">
            E-コンサル事例集
          </p>
          <SecondaryButton size="large">
            解決済みのコンサル事例を見る
          </SecondaryButton>
        </StyledHiddenScrollBar>
        <StyledHiddenScrollBar className="flex space-x-2 overflow-x-auto py-4">
          <TopItem />
          <TopItem />
          <TopItem />
        </StyledHiddenScrollBar>
        <p className="text-md text-text-secondary">
          ※ 掲載を許諾されたE-コンサルを掲載しています。
        </p>
      </div>
      <div className="mt-2 lg:mx-4 lg:mt-0 lg:ml-10 lg:w-[296px]">
        <div className="flex justify-center">
          <img src="images/top/top-popup.png" alt="" />
        </div>
        <div className="mt-2 rounded-lg bg-bg-secondary p-4">
          <p className="text-xxl font-bold text-text-primary">
            新着のE-コンサル
          </p>
          <StyledHiddenScrollBar className="flex space-x-2 overflow-x-scroll py-4">
            <TopRightItem />
            <TopRightItem />
            <TopRightItem />
          </StyledHiddenScrollBar>
          <div className="flex justify-center">
            <SecondaryButton size="large" className="w-full">
              解決済みのコンサル事例を見る
            </SecondaryButton>
          </div>
        </div>
        <div className="mt-4">
          <TopNews />
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <p className="flex-grow text-xxl font-bold text-text-primary">
              活用事例
            </p>
            <button className="text-md text-text-secondary">もっと見る</button>
          </div>
          <TopArticle />
          <TopArticle />
        </div>
      </div>
    </div>
  );
};
