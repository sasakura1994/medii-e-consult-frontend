import React from 'react';
import { useSetRecoilState } from 'recoil';
import { amazonGiftCodeComfirmState } from './amazonGiftCodeComfirmState';
import { createApiClient } from '@/libs/apiClient';

const endpoint = '/api/amazon_gift/request_pin_code';

export type UsePostAmazonGiftPinCodeType = {
  isSuccess: boolean;
  isError: boolean;
  requestPinCode: (requestId: string, pinCodeUpdate: boolean) => void;
};

/**
 * PINコードをメールに送るためのリクエスト処理
 */
export const usePostAmazonGiftPinCode = (
  token: string
): UsePostAmazonGiftPinCodeType => {
  const setAmazonGiftComfirm = useSetRecoilState(amazonGiftCodeComfirmState);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const requestPinCode = async (requestId: string, pinCodeUpdate: boolean) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token,
      contentType: 'application/json',
    });

    try {
      await apiClient.post(endpoint, {
        pin_code_update: pinCodeUpdate,
        request_id: requestId,
      });

      setIsSuccess(true);
      setAmazonGiftComfirm((oldValues) => ({
        ...oldValues,
        requestId,
        showComfirmDialog: true,
      }));
    } catch (e: unknown) {
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return {
    isSuccess,
    isError,
    requestPinCode,
  };
};
