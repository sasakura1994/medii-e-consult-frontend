import React from 'react';
import styles from './AmazonGift.module.scss';
import { useAmazonGift } from './useAmazonGift';
import { useFetchAmazonGift } from './useFetchAmazonGift';
import { usePostAmazonGiftPinCode } from './usePostAmazonGiftPinCode';
import { AmazonGiftPointExchangeDialog } from './AmazonGiftPointExchangeDialog';
import { AmazonGiftCodeConfirmDialog } from './AmazonGiftCodeConfirmDialog';

export const AmazonGift: React.FC = () => {
  const {
    priceList,
    currentPoint,
    pointExchangeState,
    isSelectEnabled,
    selectPrice,
    exchangeConfirm,
  } = useAmazonGift();
  const { amazonGifts } = useFetchAmazonGift();
  const { requestPinCode } = usePostAmazonGiftPinCode();

  return (
    <>
      <div className={styles.amazon_gift}>
        <div className="mb-4">
          <p
            className="border-b border-solid border-b-[#dcdcdc] pb-1"
            data-testid="txt-point-balance"
          >
            Mediiポイント残高
            <span className="mx-2 font-semibold">{currentPoint}</span>
            ポイント
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2">
            MediiポイントをAmazonギフト券に交換 (1ポイント = 1円分)
          </p>

          <div className="mb-4 flex">
            {priceList.map((price) => (
              <button
                type="button"
                disabled={isSelectEnabled(price)}
                className="mr-2
                           cursor-pointer
                           rounded
                           border
                           border-solid
                           border-[#999999]
                           bg-white py-1 px-2
                           last-of-type:mr-0
                           hover:bg-[#dcdcdc]
                           disabled:cursor-default
                           disabled:border-[#cccccc]
                           disabled:text-[#cccccc]
                           disabled:hover:bg-inherit"
                onClick={(e) => selectPrice(e, price)}
                data-testid={`btn-select-${price}`}
                key={price}
              >
                {price}円分
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={pointExchangeState.price ? false : true}
            className="w-[260px]
                       rounded-full
                       border-none
                       bg-primary
                       py-[7px]
                       px-6
                       font-bold
                       text-white
                       drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]
                       disabled:bg-[#999999]
                       lg:w-3/5"
            onClick={exchangeConfirm}
            data-testid="btn-exchange"
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
              {amazonGifts?.map((amazonGift) => (
                <tr key={amazonGift.uid}>
                  <td>発行作業中</td>
                  <td>1000 円</td>
                  <td className="text-right">2023/02/28</td>
                  <td>
                    {amazonGift.status === 'CONFIRMED' && (
                      <button
                        type="button"
                        className="rounded-[3px]
                       border border-solid border-[#999999]
                       bg-gray-100
                       py-1 px-2
                       text-sm
                       leading-[1.2]"
                        onClick={() =>
                          requestPinCode(amazonGift.request_id, false)
                        }
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
