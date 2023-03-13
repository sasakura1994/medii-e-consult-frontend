import React from 'react';
import { useSetRecoilState } from 'recoil';
import { amazonGiftPointExchangeState } from './amazonGiftPointExchangeState';
import { createApiClient } from '@/libs/apiClient';

const endpoint = '/api/amazon_gift/purchase_amazon_gift';

export type UsePostAmazonGiftType = {
  isSuccess: boolean;
  isError: boolean;
  requestExchange: (price: number) => void;
};

/**
 * Amazonギフトコードへの変更処理
 */
export const usePostAmazonGift = (token: string): UsePostAmazonGiftType => {
  const setAmazonGiftExchangeState = useSetRecoilState(
    amazonGiftPointExchangeState
  );
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const requestExchange = async (price: number) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token,
      contentType: 'application/json',
    });

    try {
      await apiClient.post(endpoint, {
        size: price,
      });

      setIsSuccess(true);
      setAmazonGiftExchangeState((oldValues) => ({
        ...oldValues,
        showExchangeDialog: true, // ダイアログ表示
        isExchange: false, // 交換未実行
        purchaseCompleted: true, // 交換完了
      }));
    } catch (e: unknown) {
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return {
    isSuccess,
    isError,
    requestExchange,
  };
};
