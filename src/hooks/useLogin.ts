import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export type UseLoginType = {
  login: ( email: string, password: string ) => void;
  isError: boolean;
  profile?: ProfileEntityType | null;
  token?: string;
};

export const useLogin = (): UseLoginType =>
{
  const [ isError, setIsError ] = React.useState( false );
  const [ profile, setProfile ] = React.useState<ProfileEntityType | null>( null );
  const [ token, setToken ] = React.useState( "" );

  const login = async ( email: string, password: string ) =>
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
    login,
    isError,
    profile,
    token
  };
};
