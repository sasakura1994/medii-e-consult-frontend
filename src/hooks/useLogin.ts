import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntityType } from '@/types/entities/profileEntity';
import { useRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';

export type UseLoginType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  profile?: ProfileEntityType | null;
  token: string;
};

export const useLogin = (): UseLoginType => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [profile, setProfile] = useRecoilState(profileState);
  const [token, setToken] = React.useState('');

  const login = async () => {
    try {
      const apiClient = createApiClient({ contentType: 'application/json' });
      const url = `${process.env.ENDPOINT_URL}/api/doctor/login`;

      const res = await apiClient.post(url, {
        mail_address: email,
        password: password,
      });

      console.log('res', res.data);

      if (!res) {
        throw new Error('エラーが発生しました');
      }
      if (res.data.code === -1) {
        throw new Error(res.data.message);
      }

      localStorage.setItem('token', res.data.jwt_token);
      setToken(res.data.jwt_token);
      setProfile((oldValues) => ({
        ...oldValues,
        ...res.data.doctor,
      }));
    } catch (e: unknown) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };
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
