import React from 'react';
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

  const onSuccess = async (credentialResponse: CredentialResponse) => {
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
    if (res.data.registered) router.push(redirectUrl === '' ? 'top' : redirectUrl);
    else router.push('editprofile?registerMode=true');
  };

  const onError = (error: void) => {
    console.log('Login Failed:', error);
    return error;
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} type="standard" logo_alignment="left" width="400" />;
};

const GoogleLoginButton = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';

  return (
    <div className="group flex justify-center">
      <div className="absolute z-50 mt-2 opacity-0 group-hover:bg-monotone-200">
        <GoogleOAuthProvider clientId={clientId}>
          <LoginButton />
        </GoogleOAuthProvider>
      </div>
      <div className="absolute m-auto cursor-pointer rounded-md border border-border-field group-hover:bg-monotone-200">
        <div className="flex h-[56px] w-[311px] items-center justify-center lg:w-[400px]">
          <div className="mr-[5px]">
            <img src="icons/google.svg" alt="0" width="20" height="20" />
          </div>
          <div className="text-base font-semibold text-text-caption">Googleでログイン</div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
