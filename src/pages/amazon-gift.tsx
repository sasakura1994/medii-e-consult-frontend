import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { AmazonGiftComponent } from '@/components/Organisms/MyPage/AmazonGiftComponent';
import type { NextPageWithLayout } from '@/pages/_app';

/**
 * 動作フロー
 *
 * ### ギフト交換
 * 1. 交換金額選択
 * 2. `Amazonギフトに交換する`ボタン押下
 * 3. ポイント交換確認ダイアログが表示
 * 4. `交換する`ボタン押下
 * 5. 交換を受け付けました。ギフト券の発行が完了次第メールにてご連絡いたします。メッセージ表示
 *
 * ### ギフトコード確認
 * 1. 一覧の`ギフトコード表示`ボタン押下
 * 2. ギフトコード確認ダイアログが表示
 * 3. 確認コードを入力して`ギフトコードを表示`ボタン押下
 * 4. `確認コードの再送信`ボタンがギフトコードと注意文言に切り替わる
 *
 * ### 確認コードの再送信
 * 1. `確認コードの再送信`ボタン押下
 * 2. ボタンの下に`確認コードを再送信しました。`メッセージを表示
 */

const AmazonGift: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-[2.2rem]">
        マイページ
      </h1>
      <MyPageMenu />
      <AmazonGiftComponent />
    </>
  );
};

export default AmazonGift;

AmazonGift.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
