import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type ResetPasswordArgs = {
  first_password: string;
  second_password: string;
  token: string;
};

export type PostResetPasswordResponseData = {
  code: number;
  message: string;
};

export const usePostResetPassword = () => {
  const { axios } = useAxios();

  const resetPassword = React.useCallback(
    (data: ResetPasswordArgs) => {
      return axios.post<PostResetPasswordResponseData>(
        '/api/doctor/reset_password',
        data
      );
    },
    [axios]
  );

  return { resetPassword };
};
