import { useAxios } from '@/hooks/network/useAxios';
import { ProfileEntity } from '@/types/entities/profileEntity';
import React from 'react';

export type PostLoginResponseData = {
  code: number;
  message?: string;
  jwt_token?: string;
  doctor?: ProfileEntity;
};

export const usePostLogin = () => {
  const { axios } = useAxios();

  const login = React.useCallback(
    (mail_address: string, password: string) => {
      return axios.post<PostLoginResponseData>('/doctor/login', {
        mail_address,
        password,
      });
    },
    [axios]
  );

  return { login };
};
