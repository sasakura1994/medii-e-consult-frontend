import React from 'react';
import styles from './AmazonGift.module.scss';
import { dateFormat } from '@/libs/date';
import { useAmazonGift } from './useAmazonGift';
import { useFetchAmazonGift } from '../../../hooks/api/amazonGift/useFetchAmazonGift';
import { AmazonGiftPointExchangeDialog } from './AmazonGiftPointExchangeDialog';
import { AmazonGiftCodeConfirmDialog } from './AmazonGiftCodeConfirmDialog';
import PrimaryButton from '@/components/Button/PrimaryButton';

export const AmazonGift: React.FC = () => {
  const {
    priceList,
    currentPoint,
    pointExchangeState,
    isSelectEnabled,
    selectPrice,
    exchangeConfirm,
    getExchangeStatusTitle,
    showCodeComfirmDialog,
    isExchangeEnabled,
  } = useAmazonGift();
  const { amazonGifts } = useFetchAmazonGift();

  return (
    <>
      <div className="relative mb-12 mt-10 w-full rounded border border-gray-300 bg-white px-4 py-4 lg:mb-10">
        <div className="mb-4">
          <p className="border-b border-solid border-b-heading-line pb-1" data-testid="txt-point-balance">
            Mediiポイント残高
            <span className="mx-2 font-semibold" data-testid="txt-current-point">
              {currentPoint ? new Intl.NumberFormat('ja-JP').format(currentPoint) : 0}
            </span>
            ポイント
          </p>
        </div>

        <div className="mb-6">
          {isExchangeEnabled && <p className="mb-2">MediiポイントをAmazonギフト券に交換 (1ポイント = 1円分)</p>}

          <div className="mb-4 flex">
            {priceList.map((price) => (
              <button
                type="button"
                disabled={isSelectEnabled(price) || !isExchangeEnabled}
                className="mr-2
                           cursor-pointer
                           rounded
                           border
                           border-solid
                           border-btn-gray
                           bg-white px-2 py-1
                           last-of-type:mr-0
                           hover:bg-btn-hover-gray
                           disabled:cursor-default
                           disabled:border-btn-light-gray
                           disabled:text-btn-light-gray
                           disabled:hover:bg-inherit"
                onClick={(e) => selectPrice(e, price)}
                data-testid={`btn-select-${price}`}
                key={price}
              >
                {price ? new Intl.NumberFormat('ja-JP').format(price) : 0}円分
              </button>
            ))}
          </div>
          {!isExchangeEnabled && (
            <p className="mb-4 text-base font-semibold text-red-500">
              プロフィールの登録および、医師資格の確認ができましたら、交換可能となります。
            </p>
          )}
          <PrimaryButton
            type="button"
            disabled={pointExchangeState.price ? false : true || !isExchangeEnabled}
            className="w-[260px]
                       rounded-full
                       px-6
                       py-[7px]
                       lg:w-3/5"
            onClick={exchangeConfirm}
            dataTestId="btn-exchange"
          >
            Amazonギフトに交換する
          </PrimaryButton>
        </div>

        <div>
          <h2 className="mb-3 border-b border-solid border-b-heading-line pb-1">Amazonギフト一覧</h2>

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
              {amazonGifts?.map((amazonGift) => (
                <tr key={amazonGift.uid}>
                  <td>{getExchangeStatusTitle(amazonGift.status)}</td>
                  <td>{amazonGift.size ? new Intl.NumberFormat('ja-JP').format(amazonGift.size) : 0} 円</td>
                  <td className="text-right">{dateFormat(amazonGift.created_date, 'YYYY/M/D')}</td>
                  <td>
                    {amazonGift.status === 'CONFIRMED' && (
                      <button
                        type="button"
                        className="rounded-[3px]
                                   border border-solid border-btn-gray
                                   bg-gray-100
                                   px-2 py-1
                                   text-sm
                                   leading-[1.2]"
                        onClick={() => {
                          showCodeComfirmDialog(amazonGift.request_id);
                        }}
                      >
                        ギフトコード表示
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AmazonGiftPointExchangeDialog />
      <AmazonGiftCodeConfirmDialog />
    </>
  );
};
