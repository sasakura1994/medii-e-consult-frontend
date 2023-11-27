import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';

export type PostAmazonGiftPinCodeRequestData = {
  requestId: string;
  pinCodeUpdate: boolean;
};

export type PostAmazonGiftPinCodeResponseData = {
  code: number;
  message: string;
};

/**
 * PINコードをメールに送るためのリクエスト処理
 */
export const usePostAmazonGiftPinCode = () => {
  const { axios } = useAxios();

  const requestPinCode = useCallback(
    async (data: PostAmazonGiftPinCodeRequestData) => {
      const { requestId, pinCodeUpdate } = data;

      return await axios.post<PostAmazonGiftPinCodeResponseData>('/amazon_gift/request_pin_code', {
        pin_code_update: pinCodeUpdate,
        request_id: requestId,
      });
    },
    [axios]
  );

  return {
    requestPinCode,
  };
};
