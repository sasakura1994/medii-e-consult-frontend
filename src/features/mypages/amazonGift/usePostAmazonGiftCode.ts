import React from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useSetRecoilState } from 'recoil';
import { amazonGiftCodeComfirmState } from './amazonGiftCodeComfirmState';

const endpoint = '/api/amazon_gift/show_gift_code';

export type UsePostAmazonGiftCodeType = {
  isSuccess: boolean;
  isError: boolean;
  requestGiftCode: (requestId: string, pinCode: string) => void;
};

/**
 * ギフトコードを取得する処理
 */
export const usePostAmazonGiftCode = (): UsePostAmazonGiftCodeType => {
  const { axios } = useAxios();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const setAmazonGiftCode = useSetRecoilState(amazonGiftCodeComfirmState);

  const requestGiftCode = async (requestId: string, pinCode: string) => {
    setIsSuccess(false);
    setIsError(false);

    try {
      const { data } = await axios.post(endpoint, {
        pin_code: pinCode,
        request_id: requestId,
      });

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
