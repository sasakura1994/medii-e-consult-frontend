import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export type UseLoginType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  isError: boolean;
  profile?: ProfileEntityType | null;
  token?: string;
};

export const useLogin = (): UseLoginType =>
{
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ isError, setIsError ] = React.useState( false );
  const [ profile, setProfile ] = React.useState<ProfileEntityType | null>( null );
  const [ token, setToken ] = React.useState( "" );

  const login = async () =>
  {
    const apiClient = createApiClient();
    const url = `${process.env.ENDPOINT_URL}/api/doctor/login`;
    const res = await apiClient.post(url, {
      mail_address: email,
      password: password,
    });

    console.log('res', res.data);

    if (!res) {
      setIsError(true);
      return;
    }

    localStorage.setItem( 'token', res.data.jwt_token );
    setToken( res.data.jwt_token );
    setProfile(res.data.doctor)

  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    login,
    isError,
    profile,
    token
  };
};
