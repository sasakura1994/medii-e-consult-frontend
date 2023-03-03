import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import { useSetRecoilState } from 'recoil';
import { amazonGiftCodeComfirmState } from './amazonGiftCodeComfirmState';
import { amazonGiftConfirmMock } from './amazonGiftMock';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyPostUrl = 'https://jsonplaceholder.typicode.com/posts';

export type UsePostAmazonGiftCodeType = {
  isSuccess: boolean;
  isError: boolean;
  requestGiftCode: (requestId: string, pinCode: string) => void;
};

/**
 * ギフトコードを取得する処理
 */
export const usePostAmazonGiftCode = (): UsePostAmazonGiftCodeType => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const setAmazonGiftCode = useSetRecoilState(amazonGiftCodeComfirmState);

  const requestGiftCode = async (requestId: string, pinCode: string) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token: dummyToken,
    });

    try {
      await apiClient.post(dummyPostUrl, {
        pin_code: pinCode,
        request_id: requestId,
      }); // TODO: res を受け取る

      const data = amazonGiftConfirmMock; // TODO: res.data に差し替え

      if (data.code === 1) {
        // 取得できた場合
        setAmazonGiftCode((oldValues) => ({
          ...oldValues,
          giftCode: data.gift_code,
        }));
      } else {
        // 所得が失敗した場合
        setAmazonGiftCode((oldValues) => ({
          ...oldValues,
          message: data.message,
        }));
        throw new Error(data.message);
      }

      setIsSuccess(true);
    } catch (e: unknown) {
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return {
    isSuccess,
    isError,
    requestGiftCode,
  };
};
