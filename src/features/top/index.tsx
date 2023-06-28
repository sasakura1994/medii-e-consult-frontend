import Secondary from '@/components/Button/Secondary';
import { InlineNotification } from '@/components/Notification/InlineNotification';
import React from 'react';
import { TopArticle } from './TopArticle';
import { TopRightItem } from './TopRightItem';
import { StyledHiddenScrollBar } from './styled';
import { UserConsult } from './UserConsult';

export const Top = () => {
  return (
    <div className="mx-4 min-h-screen pb-12 pt-6 lg:mx-10 lg:flex lg:pb-0">
      <div className="w-full lg:w-[1024px]">
        <InlineNotification
          text="ご卒業おめでとうございます🌸 卒業予定年となったため、医師情報の登録をお願いします。"
          ButtonText="変更する"
        />
        <UserConsult />
      </div>
      <div className="mt-2 lg:mx-4 lg:mt-0 lg:ml-10 lg:w-[296px]">
        <div className="rounded-lg bg-bg-secondary p-4">
          <p className="text-xxl font-bold text-text-primary">新着E-コンサル</p>
          <StyledHiddenScrollBar className="flex space-x-2 overflow-x-scroll py-4">
            <TopRightItem />
            <TopRightItem />
            <TopRightItem />
          </StyledHiddenScrollBar>
          <div className="flex justify-center">
            <Secondary width="full">解決済みのコンサル事例を見る</Secondary>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <p className="flex-grow text-xxl font-bold text-text-primary">
              お知らせ
            </p>
            <button className="text-md text-text-secondary">すべて見る</button>
          </div>
          <TopArticle />
          <TopArticle />
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
