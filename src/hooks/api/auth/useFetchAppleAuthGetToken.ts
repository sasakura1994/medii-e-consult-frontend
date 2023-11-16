import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

type Query = {
  token: string;
}

type UseFetchAppleAuthGetTokenRequestData = {
  token_id: string;
};

type UseFetchAppleAuthGetTokenResponseData = {
  jwt_token: string;
  login_type: 'login' | 'register';
};

export const Login = () => {
  const router = useRouter();
  const { token } = router.query as Query;
  const { setTokenAndMarkInitialized } = useToken();
  const { redirectUrl } = useLogin();

  const fetchAppleAuthGetToken = useCallback(async (data: UseFetchAppleAuthGetTokenRequestData) => {
    const { token_id } = data;
    const response = axios.get<UseFetchAppleAuthGetTokenResponseData>('/apple_auth/get_token', {
      baseURL: process.env.ENDPOINT_URL,
      headers: { 'Content-Type': 'application/json' },
      params: { token_id: token_id },
    });
    return response;
  }, []);

  useEffect(() => {
    fetchAppleAuthGetToken({ token_id: token })
    .then((res) => {
      const { jwt_token, login_type } = res.data;
      setTokenAndMarkInitialized(jwt_token);
      if (login_type==="register") router.push(redirectUrl === '' ? 'top' : redirectUrl);
      else router.push('editprofile?registerMode=1');
    })
    .catch((err) => {
      console.log(err);
    });
  }, [token, fetchAppleAuthGetToken, setTokenAndMarkInitialized, redirectUrl, router]);
};
