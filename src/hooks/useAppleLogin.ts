import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import { useFetchAppleAuthGetToken } from './api/auth/useFetchAppleAuthGetToken'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type Query = {
  token: string;
};

export const useAppleLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { token } = router.query as Query;
  const { setTokenAndMarkInitialized } = useToken();
  const { redirectUrl } = useLogin();
  const { fetchAppleAuthGetToken } = useFetchAppleAuthGetToken();

  const login = useCallback(async () => {
    const response = await fetchAppleAuthGetToken({ token_id: token });

    if (response) {
      const { jwt_token, login_type } = response.data;
      setTokenAndMarkInitialized(jwt_token);
      if (login_type === 'login') router.push(redirectUrl === '' ? 'top' : redirectUrl);
      else router.push('editprofile?registerMode=1');
    } else {
      setErrorMessage('LoginFailed');
    }
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  return {
    errorMessage,
  };
};
