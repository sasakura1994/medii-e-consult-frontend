import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type SetPasswordArgs = {
  first_password: string;
  second_password: string;
  token: string;
};

export type PostSetPasswordResponseData = {
  code: number;
  jwt_token: string;
  message: string;
};

export const usePostSetPassword = () => {
  const { axios } = useAxios();

  const setPassword = React.useCallback(
    (data: SetPasswordArgs) => {
      return axios.post<PostSetPasswordResponseData>(
        '/doctor/set_password',
        data
      );
    },
    [axios]
  );

  return { setPassword };
};
