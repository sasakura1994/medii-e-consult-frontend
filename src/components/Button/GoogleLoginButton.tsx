import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@/hooks/api/doctor/useGoogleLogin';
import { mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useToken } from '@/hooks/authentication/useToken';
import { loginRedirectUrlKey } from '@/data/localStorage';
import { useRouter } from 'next/router';
import { useLogin } from '@/hooks/useLogin';
import { CredentialResponse } from '@react-oauth/google';

const LoginButton = () => {
  const { googleLogin } = useGoogleLogin();
  const { setTokenAndMarkInitialized } = useToken();
  const router = useRouter();
  const { redirectUrl } = useLogin();

  const onSuccess: (credentialResponse: CredentialResponse) => void = async (
    credentialResponse: CredentialResponse
  ) => {
    const id_token = credentialResponse?.credential;

    if (!id_token) {
      console.error('ID Token not found:', credentialResponse);
      return;
    }

    const res = await googleLogin(id_token).catch((error) => {
      console.error(error);
    });

    if (!res) {
      return;
    }

    setTokenAndMarkInitialized(res.data.jwt_token);
    mutateFetchProfile();
    localStorage.removeItem(loginRedirectUrlKey);
    router.push(redirectUrl === '' ? 'top' : redirectUrl);
  };

  const onError = (error: void) => {
    console.log('Login Failed:', error);
    return error;
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} type="standard" logo_alignment="left"  width='270'/>;
};

const GoogleLoginButton = () => {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (process.env.CLIENT_ID) setClientId(process.env.CLIENT_ID);
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
