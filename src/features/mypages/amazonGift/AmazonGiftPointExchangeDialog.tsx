import React from 'react';
import { useAmazonGift } from './useAmazonGift';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

export const AmazonGiftPointExchangeDialog: React.FC = () => {
  const { pointExchangeState, exchangeExec, closePointExchangeDialog } =
    useAmazonGift();

  if (!pointExchangeState.showExchangeDialog) {
    return null;
  }

  return (
    <div
      className="absolute top-0 left-0 bottom-0 right-0 bg-white/[0.4]"
      data-testid="amazon-gift-exchange-dialog"
    >
      <div
        className="absolute top-1/2 left-1/2 w-[90%] translate-y-[-50%] translate-x-[-50%]
                   rounded
                   border border-solid border-[#999999]
                   bg-white
                   p-4
                   lg:w-[33%]"
      >
        <div className="mb-3 flex justify-between">
          <h2>ポイント交換確認</h2>
          <button type="button" onClick={closePointExchangeDialog}>
            閉じる
          </button>
        </div>

        <p className="mb-4">
          <span className="mr-1 font-bold">{pointExchangeState.price}</span>
          円分のAmazonギフトに交換します。よろしいですか。
        </p>

        {pointExchangeState.purchaseCompleted && (
          <p data-testid="txt-exchange-completed">
            交換を受け付けました。ギフト券の発行が完了次第メールにてご連絡いたします。
          </p>
        )}

        {pointExchangeState.isExchange && (
          <SpinnerBorder style={{ display: 'block', margin: '0 auto' }} />
        )}

        {!pointExchangeState.isExchange &&
          !pointExchangeState.purchaseCompleted && (
            <button
              type="button"
              onClick={() => exchangeExec(pointExchangeState.price)}
              className="mx-auto
                         mb-3
                         block
                         rounded-full
                         bg-primary
                         py-[7px] px-6
                         font-bold text-white
                         drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]"
              data-testid="btn-exec-exchange"
            >
              交換する
            </button>
          )}
      </div>
    </div>
  );
};
