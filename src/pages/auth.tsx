import { mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useToken } from '@/hooks/authentication/useToken';
import { useAxios } from '@/hooks/network/useAxios';
import { useLogin } from '@/hooks/useLogin';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    Login();
  }, []);

  const searchParams = useSearchParams()
  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { axios } = useAxios();
  const token = searchParams.get('search')
  console.log('token', token, 'test token');
  const { setTokenAndMarkInitialized } = useToken();

  const Login = async () => {
    const response = await axios
      .get(`/apple_auth/get_token?token_id=${token}`)
      .catch((error) => {
        console.error(error);
      });

    if (response) {
      setTokenAndMarkInitialized(response.data.jwt_token);

      const profileResponse = await axios
        .get('/doctor/profile', response.data.jwt_token)
        .catch((error) => {
          console.error(error);
        });

      if (profileResponse) {
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
