import React from 'react';
import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { amazonGiftPointExchangeState } from './amazonGiftPointExchangeState';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { amazonGiftsMock } from './amazonGiftMock';
import type { KeyedMutator } from 'swr';
import type { AmazonGiftEntityType } from './amazonGiftEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/4';
const dummyPostUrl = 'https://jsonplaceholder.typicode.com/posts';

export type UsePostAmazonGiftType = {
  isSuccess: boolean;
  isError: boolean;
  mutate: KeyedMutator<AmazonGiftEntityType[]>;
  requestExchange: (price: number) => void;
};

/**
 * Amazonギフトコードへの変更処理
 */
export const usePostAmazonGift = (): UsePostAmazonGiftType => {
  const setAmazonGiftExchangeState = useSetRecoilState(
    amazonGiftPointExchangeState
  );
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const { data: amazonGifts, mutate } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<AmazonGiftEntityType>(url); // TODO: res を受け取る
      const data = amazonGiftsMock; // TODO: res.data として変数にセット

      const amazonGifts = data.map((data) =>
        fromNullToUndefined<AmazonGiftEntityType>(data)
      );

      return amazonGifts;
    }
  );

  const requestExchange = async (price: number) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token: dummyToken,
    });

    try {
      await apiClient.post(dummyPostUrl, {
        size: price,
      });

      const newData = amazonGifts || [];
      mutate([...newData], false);
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
    mutate,
    requestExchange,
  };
};
