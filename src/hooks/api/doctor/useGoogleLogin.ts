import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostGoogleLoginResponseData = {
  jwt_token: string;
  registered: boolean;
  message?: string;
};

export const useGoogleLogin = () => {
  const { axios } = useAxios();

  const googleLogin = useCallback(
    (id_token: string) => {
      return axios.post<PostGoogleLoginResponseData>('/oauth/google/verify-token', {
        id_token: id_token,
      });
    },
    [axios]
  );

  return { googleLogin };
};
