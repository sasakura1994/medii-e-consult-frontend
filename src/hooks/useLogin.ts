import React, { useEffect } from 'react';
import type { ProfileEntity } from '@/types/entities/profileEntity';
import { useRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';
import { useToken } from './authentication/useToken';
import { usePostLogin } from './api/doctor/usePostLogin';
import { useRouter } from 'next/router';

export const loginRedirectUrlKey = 'Login:redirectUrl';

type Query = {
  redirect?: string;
};

export type UseLoginType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  profile?: ProfileEntity | null;
  saveRedirectUrl: () => void;
  token: string;
};

export const useLogin = (): UseLoginType => {
  const router = useRouter();
  const { redirect } = router.query as Query;
  const [redirectUrl, setRedirectUrl] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [profile, setProfile] = useRecoilState(profileState);
  const { token, setTokenAndMarkInitialized } = useToken();
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
        setErrorMessage(error.response.data?.message || 'エラーが発生しました');
        return null;
      });

      if (!res) {
        return;
      }

      setTokenAndMarkInitialized(res.data.jwt_token!);
      setProfile(res.data.doctor!);
      localStorage.removeItem(loginRedirectUrlKey);

      router.push(redirectUrl === '' ? 'top' : redirectUrl);
    },
    [
      email,
      password,
      postLogin,
      redirectUrl,
      router,
      setProfile,
      setTokenAndMarkInitialized,
    ]
  );

  const saveRedirectUrl = React.useCallback(() => {
    if (redirect) {
      localStorage.setItem(loginRedirectUrlKey, redirect);
    }
  }, [redirect]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    login,
    profile,
    saveRedirectUrl,
    token,
  };
};
