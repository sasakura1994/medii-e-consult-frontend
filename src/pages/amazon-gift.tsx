import React from 'react';
import styles from '@/styles/pages/amazon-gift.module.scss';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { AmazonGiftExchangeDialog } from '@/components/Organisms/MyPage/AmazonGiftExchangeDialog';
import { AmazonGiftConfirmDialog } from '@/components/Organisms/MyPage/AmazonGiftConfirmDialog';
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
      <div className={styles.amazon_gift}>
        <div className="mb-4">
          <p className="border-b border-solid border-b-[#dcdcdc] pb-1">
            Mediiポイント残高<span className="mx-2 font-semibold">2500</span>
            ポイント
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2">
            MediiポイントをAmazonギフト券に交換 (1ポイント = 1円分)
          </p>

          <div className="mb-4 flex">
            <button type="button" className={styles.amazon_gift__btn_choice}>
              1000円分
            </button>
            <button type="button" className={styles.amazon_gift__btn_choice}>
              3000円分
            </button>
            <button type="button" className={styles.amazon_gift__btn_choice}>
              5000円分
            </button>
            <button type="button" className={styles.amazon_gift__btn_choice}>
              10000円分
            </button>
          </div>

          <button
            type="button"
            className="w-3/5
                       rounded-full
                       border-none
                       bg-[#999999]
                       py-[7px]
                       px-[24px]
                       font-bold
                       text-white
                       drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]"
          >
            Amazonギフトに交換する
          </button>
        </div>

        <div>
          <h2 className="mb-3 border-b border-solid border-b-[#dcdcdc] pb-1">
            Amazonギフト一覧
          </h2>

          <table className={styles.amazon_gift_table}>
            <thead>
              <tr>
                <th>ステータス</th>
                <th>金額</th>
                <th>交換日時</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>発行作業中</td>
                <td>1000 円</td>
                <td className="text-right">2023/02/28</td>
                <td>
                  <button
                    type="button"
                    className="rounded-[3px]
                               border border-solid border-[#999999]
                               bg-gray-100
                               py-1 px-2
                               text-sm
                               leading-[1.2]"
                    onClick={() => console.log('ギフトコード表示')}
                  >
                    ギフトコード表示
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AmazonGiftExchangeDialog />
      <AmazonGiftConfirmDialog />
    </>
  );
};

export default AmazonGift;

AmazonGift.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
