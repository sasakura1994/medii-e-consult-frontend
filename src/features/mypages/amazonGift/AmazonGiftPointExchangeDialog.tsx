import React from 'react';
import { useAmazonGift } from './useAmazonGift';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import PrimaryButton from '@/components/Button/PrimaryButton';

export const AmazonGiftPointExchangeDialog: React.FC = () => {
  const { pointExchangeState, exchangeExec, closePointExchangeDialog } = useAmazonGift();

  if (!pointExchangeState.showExchangeDialog) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-white/[0.4]" data-testid="amazon-gift-exchange-dialog">
      <div
        className="absolute left-1/2 top-1/2 w-[90%] translate-x-[-50%] translate-y-[-50%]
                   rounded
                   border border-solid border-block-gray
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
          <span className="mr-1 font-bold">
            {pointExchangeState.price && new Intl.NumberFormat('ja-JP').format(pointExchangeState.price)}
          </span>
          円分のAmazonギフトに交換します。よろしいですか。
        </p>

        {pointExchangeState.purchaseCompleted && (
          <p data-testid="txt-exchange-completed">
            交換を受け付けました。ギフト券の発行が完了次第メールにてご連絡いたします。
          </p>
        )}

        {pointExchangeState.isExchange && <SpinnerBorder style={{ display: 'block', margin: '0 auto' }} />}

        {!pointExchangeState.isExchange && !pointExchangeState.purchaseCompleted && (
          <PrimaryButton
            type="button"
            onClick={() => exchangeExec(pointExchangeState.price)}
            className="mx-auto mb-3 px-6 py-[7px]"
            dataTestId="btn-exec-exchange"
          >
            交換する
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
