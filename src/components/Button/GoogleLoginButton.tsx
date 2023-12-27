import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLoginButton } from './useGoogleLoginButton';

type GoogleRegisterProps = {
  googleRegister?: boolean;
};

const GoogleLoginButton = (props: GoogleRegisterProps) => {
  const { googleRegister } = props;
  const { clientId, onSuccess, onError, width } = useGoogleLoginButton({ googleRegister });

  return (
    <div className="group flex justify-center">
      <div className="opacity-1 absolute z-50 mt-2 group-hover:bg-monotone-200">
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={onSuccess} onError={onError} type="standard" logo_alignment="left" width={width} />
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
