import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@/hooks/api/doctor/useGoogleLogin';
import { mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useToken } from '@/hooks/authentication/useToken';
import { loginRedirectUrlKey } from '@/data/localStorage';
import { useRouter } from 'next/router';
import { useLogin } from '@/hooks/useLogin';
import { CredentialResponse } from '@react-oauth/google';

type GoogleRegisterProps = {
  googleRegister?: boolean;
};

const LoginButton = ({ googleRegister }: GoogleRegisterProps) => {
  const { googleLogin } = useGoogleLogin();
  const { setTokenAndMarkInitialized } = useToken();
  const router = useRouter();
  const { redirectUrl } = useLogin();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('credentialResponse', credentialResponse);
    const id_token = credentialResponse?.credential;
    const client_id = credentialResponse?.clientId;

    if (!id_token || !client_id) {
      console.error('ID Token not found:', credentialResponse);
      return;
    }

    const res = await googleLogin(id_token, client_id).catch((error) => {
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

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!googleRegister) {
        setWidth(window.innerWidth > 1024 ? 390 : 300);
      } else {
        setWidth(window.innerWidth > 1024 ? 310 : 300);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <GoogleLogin onSuccess={onSuccess} onError={onError} type="standard" logo_alignment="left" width={width} />;
};

const GoogleLoginButton = ({ googleRegister }: GoogleRegisterProps) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';

  return (
    <div className="group flex justify-center">
      <div className="absolute z-50 mt-2 opacity-0 group-hover:bg-monotone-200">
        <GoogleOAuthProvider clientId={clientId}>
          <LoginButton googleRegister={googleRegister} />
        </GoogleOAuthProvider>
      </div>
      <div className="absolute m-auto cursor-pointer rounded-md border border-border-field group-hover:bg-monotone-200">
        <div
          className={`flex h-[56px] ${googleRegister ? 'w-[317px]' : 'w-[310px]'} items-center justify-center ${
            googleRegister ? 'lg:w-[320px]' : 'lg:w-[400px]'
          }`}
        >
          <div className="mr-[5px]">
            <img src="icons/google.svg" alt="0" width="20" height="20" />
          </div>
          <div className="text-base font-semibold text-text-caption">
            {googleRegister ? 'Googleアカウントで登録する' : 'Googleでログイン'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
