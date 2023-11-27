import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';

export type PostAmazonGiftRequestData = {
  price: number;
};

type PostAmazonGiftResponseData = {
  code: number;
  message: string;
};

/**
 * Amazonギフトコードへの変更処理
 */
export const usePostAmazonGift = () => {
  const { axios } = useAxios();

  const requestExchange = useCallback(
    async (data: PostAmazonGiftRequestData) => {
      const { price } = data;

      return await axios.post<PostAmazonGiftResponseData>('/amazon_gift/purchase_amazon_gift', {
        size: price,
      });
    },
    [axios]
  );

  return {
    requestExchange,
  };
};
