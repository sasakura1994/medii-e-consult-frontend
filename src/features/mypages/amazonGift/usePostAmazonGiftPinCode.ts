import React from 'react';
import { useSetRecoilState } from 'recoil';
import { amazonGiftCodeComfirmState } from './amazonGiftCodeComfirmState';
import { createApiClient } from '@/libs/apiClient';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyPostUrl = 'https://jsonplaceholder.typicode.com/posts';

export type UsePostAmazonGiftPinCodeType = {
  isSuccess: boolean;
  isError: boolean;
  requestPinCode: (requestId: string, pinCodeUpdate: boolean) => void;
};

/**
 * PINコードをメールに送るためのリクエスト処理
 */
export const usePostAmazonGiftPinCode = (): UsePostAmazonGiftPinCodeType => {
  const setAmazonGiftComfirm = useSetRecoilState(amazonGiftCodeComfirmState);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const requestPinCode = async (requestId: string, pinCodeUpdate: boolean) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token: dummyToken,
    });

    try {
      const res = await apiClient.post(dummyPostUrl, {
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
