import React, { useEffect } from 'react';
import type { ProfileEntity } from '@/types/entities/profileEntity';
import { useToken } from './authentication/useToken';
import { usePostLogin } from './api/doctor/usePostLogin';
import { useRouter } from 'next/router';
import { mutateFetchProfile } from './api/doctor/useFetchProfile';

export const loginRedirectUrlKey = 'Login:redirectUrl';

type Query = {
  redirect?: string;
};

export const useLogin = () => {
  const router = useRouter();
  const { redirect } = router.query as Query;
  const [redirectUrl, setRedirectUrl] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setTokenAndMarkInitialized } = useToken();
  const { login: postLogin } = usePostLogin();

  useEffect(() => {
    if (redirect) {
      setRedirectUrl(redirect);
      localStorage.removeItem(loginRedirectUrlKey);
      return;
    }

    const savedRedirectUrl = localStorage.getItem(loginRedirectUrlKey);
    if (savedRedirectUrl) {
      setRedirectUrl(savedRedirectUrl);
    }
  }, [redirect]);

  const login = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await postLogin(email, password).catch((error) => {
        console.error(error);
        setErrorMessage(error.message || 'エラーが発生しました');
        return null;
      });

      if (!res) {
        return;
      }

      if (res.data.jwt_token) {
        setTokenAndMarkInitialized(res.data.jwt_token);
        mutateFetchProfile();
        localStorage.removeItem(loginRedirectUrlKey);

        router.push(redirectUrl === '' ? 'top' : redirectUrl);
        return;
      }
      setErrorMessage('エラーが発生しました');
    },
    [
      email,
      password,
      postLogin,
      redirectUrl,
      router,
      setTokenAndMarkInitialized,
    ]
  );

  const saveRedirectUrl = React.useCallback(() => {
    if (redirect) {
      localStorage.setItem(loginRedirectUrlKey, redirect);
    }
  }, [redirect]);

  return {
    setEmail,
    setPassword,
    login,
    errorMessage,
    saveRedirectUrl,
  };
};
