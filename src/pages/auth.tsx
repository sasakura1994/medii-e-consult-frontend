import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchToken } from '@/hooks/api/auth/useFetchAppleAuthGetToken';
import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    Login();
  }, []);

  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { setTokenAndMarkInitialized } = useToken();
  const { profile } = useFetchProfile();

  const Login = async () => {
    const response = await useFetchToken();
    console.log("responses", response);

    if(response) {
      setTokenAndMarkInitialized(response.data.jwt_token);

      if(profile) {
        mutateFetchProfile();
        if (response.data.login_type==="register") router.push(redirectUrl === '' ? 'top' : redirectUrl);
        else router.push('editprofile?registerMode=true');
      }
    }
  };

  return (
    <div className="flex h-screen justify-center bg-bg">
      <div className="mb-12 mt-6">
        <div>loading...</div>
      </div>
    </div>
  );
};

export default Auth;
