import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type PostLoginResponseData = {
  code: number;
  jwt_token: string;
};

export const useRefreshToken = () => {
  const { axios } = useAxios();

  const refreshToken = React.useCallback(() => {
    return axios.get<PostLoginResponseData>('/doctor/refresh_token');
  }, [axios]);

  return { refreshToken };
};
