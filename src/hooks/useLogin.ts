import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntity } from '@/types/entities/profileEntity';
import { useRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';
import { setAuthToken } from '@/libs/cookie';
import { useToken } from './authentication/useToken';
import { usePostLogin } from './api/doctor/usePostLogin';
import { useRouter } from 'next/router';

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
  token: string;
};

export const useLogin = (): UseLoginType => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [profile, setProfile] = useRecoilState(profileState);
  const { token, setTokenAndMarkInitialized } = useToken();
  const { login: postLogin } = usePostLogin();

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

      setAuthToken(res.data.jwt_token!);
      setTokenAndMarkInitialized(res.data.jwt_token!);
      setProfile(res.data.doctor!);

      const { redirect } = router.query as Query;

      router.push(redirect || 'top');
    },
    [email, password]
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    login,
    profile,
    token,
  };
};
