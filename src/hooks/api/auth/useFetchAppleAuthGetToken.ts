import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { token } = router.query as Query;
  const { setTokenAndMarkInitialized } = useToken();
  const { redirectUrl } = useLogin();

  const fetchAppleAuthGetToken = async (data: UseFetchAppleAuthGetTokenRequestData) => {
    const { token_id } = data;
    const response = await  axios.get<UseFetchAppleAuthGetTokenResponseData>('/apple_auth/get_token', {
      baseURL: process.env.ENDPOINT_URL,
      headers: { 'Content-Type': 'application/json' },
      params: { token_id: token_id },
    });
    
    if(response) {
      const { jwt_token, login_type } = response.data;
      setTokenAndMarkInitialized(jwt_token);
      if (login_type==="register") router.push(redirectUrl === '' ? 'top' : redirectUrl);
      else router.push('editprofile?registerMode=1');
    } else {
      setErrorMessage('LoginFailed');
    };
  };

  useEffect(() => {
    fetchAppleAuthGetToken({ token_id: token });
  }, [token, fetchAppleAuthGetToken]);


  return {
    errorMessage,
  }
};
