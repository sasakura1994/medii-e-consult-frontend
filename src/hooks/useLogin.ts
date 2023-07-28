import React, { useEffect } from 'react';
import { useToken } from './authentication/useToken';
import { usePostLogin } from './api/doctor/usePostLogin';
import { useRouter } from 'next/router';
import { mutateFetchProfile } from './api/doctor/useFetchProfile';

export const loginRedirectUrlKey = 'Login:redirectUrl';

type Query = {
  from?: 'case_bank';
  redirect?: string;
};

export type UseLogin = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  saveRedirectUrl: () => void;
};

export const useLogin = (): UseLogin => {
  const router = useRouter();
  const { redirect, from } = router.query as Query;
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

      if (!res.data.jwt_token) {
        setErrorMessage('エラーが発生しました');
        return;
      }

      if (from === 'case_bank') {
        location.href = process.env.CASE_BANK_URL + `/login/callback?t=${res.data.jwt_token}`;
        return;
      }

      setTokenAndMarkInitialized(res.data.jwt_token);
      mutateFetchProfile();
      localStorage.removeItem(loginRedirectUrlKey);

      router.push(redirectUrl === '' ? 'top' : redirectUrl);
    },
    [email, from, password, postLogin, redirectUrl, router, setTokenAndMarkInitialized]
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
