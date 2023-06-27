import { InlineNotification } from '@/components/Notification/InlineNotification';
import React from 'react';

export const Top = () => {
  return (
    <div className="min-h-screen pt-6 lg:flex">
      <div className="w-full lg:w-[1024px]">
        <InlineNotification
          text="ご卒業おめでとうございます🌸 卒業予定年となったため、医師情報の登録をお願いします。"
          ButtonText="変更する"
        />
      </div>
      <div className="ml-10 w-[296px] ">
        <div className="flex items-center">
          <p className="flex-grow text-xxl text-text-primary">活用事例</p>
          <p className="text-md text-text-secondary">もっと見る</p>
        </div>
        <div className="flex border-b py-4">
          <div className="w-[200px]">
            <p className="text-md text-text-primary line-clamp-3">
              若手医師が感じる経験不足をE-コンサルで補う。迷ったら、まず気軽に質問してみることが患者さんのためになる。
            </p>
            <p className="text-sm text-text-secondary">リウマチ膠原病内科医</p>
            <p className="text-sm text-text-secondary">多田先生</p>
          </div>
          <div className="mr-2">
            <img
              className=" h-[60px] w-[88px]"
              src="images/top/tmp_494.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex border-b py-4">
          <div className="w-[200px]">
            <p className="text-md text-text-primary line-clamp-3">
              若手医師が感じる経験不足をE-コンサルで補う。迷ったら、まず気軽に質問してみることが患者さんのためになる。
            </p>
            <p className="text-sm text-text-secondary">リウマチ膠原病内科医</p>
            <p className="text-sm text-text-secondary">多田先生</p>
          </div>
          <div className="mr-2">
            <img
              className=" h-[60px] w-[88px]"
              src="images/top/tmp_494.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
