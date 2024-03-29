import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

type PostRequestResetPasswordRequestData = {
  mail_address: string;
};

export type PostRequestResetPasswordResponseData = {
  code: number;
  message: string;
};

/**
 * パスワードリセット要求
 */
export const usePostRequestResetPassword = () => {
  const { axios } = useAxios();

  const requestResetPassword = React.useCallback(
    async (mailAddress: string) => {
      const data: PostRequestResetPasswordRequestData = {
        mail_address: mailAddress,
      };

      return axios.post<PostRequestResetPasswordResponseData>('/doctor/request_reset_password', data);
    },
    [axios]
  );

  return {
    requestResetPassword,
  };
};
