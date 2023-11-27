import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';

export type PostAmazonGiftCodeRequestData = {
  requestId: string;
  pinCode: string;
};

export type PostAmazonGiftCodeResponseData = {
  code: number;
  message: string;
  gift_code?: string;
};

/**
 * ギフトコードを取得する処理
 */
export const usePostAmazonGiftCode = () => {
  const { axios } = useAxios();

  const requestGiftCode = useCallback(
    async (data: PostAmazonGiftCodeRequestData) => {
      const { requestId, pinCode } = data;

      return await axios.post<PostAmazonGiftCodeResponseData>('/amazon_gift/show_gift_code', {
        pin_code: pinCode,
        request_id: requestId,
      });
    },
    [axios]
  );

  return {
    requestGiftCode,
  };
};
