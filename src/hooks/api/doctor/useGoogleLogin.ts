import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

type PostGoogleLoginResponseData = {
  jwt_token: string;
  registered: boolean;
  message?: string;
};

type PostGoogleLoginRequestData = {
  id_token: string;
  queries: Record<string, string>;
};

export const useGoogleLogin = () => {
  const { axios } = useAxios();
  const googleLogin = useCallback(
    (data: PostGoogleLoginRequestData) => {
      return axios.post<PostGoogleLoginResponseData>('/oauth/google/verify-token', data);
    },
    [axios]
  );

  return { googleLogin };
};
