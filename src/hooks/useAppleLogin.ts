import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useFetchAppleAuthGetToken } from './api/auth/useFetchAppleAuthGetToken';

type Query = {
  token: string;
};

export const useAppleLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { token } = router.query as Query;
  const { setTokenAndMarkInitialized } = useToken();
  const { redirectUrl } = useLogin();
  console.log('aaaaaa');
  const { fetchAppleAuthGetToken } = useFetchAppleAuthGetToken();

  const login = useCallback(async () => {
    const response = await fetchAppleAuthGetToken({ token_id: token });
    if (response) {
      const { jwt_token, login_type } = response.data;
      setTokenAndMarkInitialized(jwt_token);
      if (login_type === 'register') {
        router.push('editprofile?registerMode=1');
      } else {
        router.push(redirectUrl === '' ? 'top' : redirectUrl);
      }
    } else {
      setErrorMessage('LoginFailed');
    }
  }, [fetchAppleAuthGetToken, redirectUrl, router, setTokenAndMarkInitialized, token]);

  useEffect(() => {
    login();
  }, [login]);

  return {
    errorMessage,
  };
};
