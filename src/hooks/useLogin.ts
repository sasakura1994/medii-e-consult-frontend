import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export type UseLoginType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  isError: boolean;
  profile?: ProfileEntityType | null;
  token: string;
};

export const useLogin = (): UseLoginType =>
{
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ isError, setIsError ] = React.useState( false );
  const [ errorMessage, setErrorMessage ] = React.useState('');
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
      setErrorMessage('エラーが発生しました');
      return;
    }
    if ( res.data.code === -1 )
    {
      setIsError( true );
      console.log( res.data.message );
      setErrorMessage(res.data.message);
      return;
    }

    localStorage.setItem('token', res.data.jwt_token);
    setToken(res.data.jwt_token);
    setProfile(res.data.doctor)

  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    login,
    isError,
    profile,
    token
  };
};
