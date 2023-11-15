import { searchParam } from '@/features/auth/useSearchParams';
import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useToken } from '@/hooks/authentication/useToken';
import { useAxios } from '@/hooks/network/useAxios';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    Login();
  }, []);

  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { axios } = useAxios();
  const { setTokenAndMarkInitialized } = useToken();
  const { profile } = useFetchProfile();
  const token = searchParam();

  const Login = async () => {
    const response = await axios
      .get(`/apple_auth/get_token?token_id=${token}`)
      .catch((error) => {
        console.error(error);
      });

    console.log("response", response);

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
