import Secondary from '@/components/Button/Secondary';
import { InlineNotification } from '@/components/Notification/InlineNotification';
import React from 'react';
import { TopArticle } from './TopArticle';
import { TopItem } from './TopItem';

export const Top = () => {
  return (
    <div className="mx-4 min-h-screen pt-6 lg:mx-10 lg:flex">
      <div className="w-full lg:w-[1024px]">
        <InlineNotification
          text="ご卒業おめでとうございます🌸 卒業予定年となったため、医師情報の登録をお願いします。"
          ButtonText="変更する"
        />
        <div className="mt-10 flex items-center">
          <p className="flex-grow text-xxl font-bold text-text-primary">
            新着E-コンサル
          </p>
          <Secondary>コンサル事例を見る</Secondary>
        </div>
        <TopItem />
      </div>
      <div></div>
      <div className="mx-4 mt-2 w-[296px] lg:mt-0 lg:ml-10 ">
        <div className="flex items-center">
          <p className="flex-grow text-xxl text-text-primary">活用事例</p>
          <button className="text-md text-text-secondary">もっと見る</button>
        </div>
        <TopArticle />
        <TopArticle />
      </div>
    </div>
  );
};
