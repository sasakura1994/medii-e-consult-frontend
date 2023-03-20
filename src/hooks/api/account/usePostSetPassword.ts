import { useAxios } from '@/hooks/useAxios';
import React from 'react';

export type SetPasswordArgs = {
  first_password: string;
  second_password: string;
  token: string;
};

export type PostSetPasswordResponseData = {
  code: number;
  message: string;
};

export const usePostSetPassword = () => {
  const { axios } = useAxios();

  const setPassword = React.useCallback(
    (data: SetPasswordArgs) => {
      return axios.post<PostSetPasswordResponseData>(
        '/api/doctor/set_password',
        data
      );
    },
    [axios]
  );

  return { setPassword };
};
