import React from 'react';
import { useAmazonGift } from './useAmazonGift';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';

export const AmazonGiftPointExchangeDialog: React.FC = () => {
  const { pointExchangeState, exchangeExec, closePointExchangeDialog } = useAmazonGift();

  if (!pointExchangeState.showExchangeDialog) {
    return null;
  }

  return (
    <Modal pcWidth="400" dataTestId="amazon-gift-exchange-dialog">
      <div className="px-4 py-2">
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
    </Modal>
  );
};
