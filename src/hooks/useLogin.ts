import React, { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react';
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
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  login: (e: FormEvent<HTMLFormElement>) => void;
  goToRegistration: () => void;
  saveRedirectUrl: () => void;
};

export const useLogin = (): UseLogin => {
  const router = useRouter();
  const { redirect, from } = router.query as Query;
  const [redirectUrl, setRedirectUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  const login = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await postLogin(email, password).catch((error) => {
        console.error(error);
        setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
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

  const saveRedirectUrl = useCallback(() => {
    if (redirect) {
      localStorage.setItem(loginRedirectUrlKey, redirect);
    }
  }, [redirect]);

  const goToRegistration = useCallback(() => {
    const parts: string[] = [];

    for (const key in router.query) {
      const value = router.query[key];
      if (typeof value === 'string' || value instanceof String) {
        parts.push(`${key}=${encodeURIComponent(value as string)}`);
      } else {
        (value as string[]).forEach((value) => {
          parts.push(`${key}=${encodeURIComponent(value as string)}`);
        });
      }
    }

    saveRedirectUrl();
    router.push(parts.length === 0 ? '/registration' : `/registration?${parts.join('&')}`);
  }, [router, saveRedirectUrl]);

  return {
    setEmail,
    setPassword,
    login,
    errorMessage,
    goToRegistration,
    saveRedirectUrl,
  };
};
