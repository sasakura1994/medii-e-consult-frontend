import { loginRedirectUrlKey } from '@/data/localStorage';
import { mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useGoogleLogin } from '@/hooks/api/doctor/useGoogleLogin';
import { useToken } from '@/hooks/authentication/useToken';
import { useLogin } from '@/hooks/useLogin';
import { CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  googleRegister?: boolean;
};

export const useGoogleLoginButton = ({ googleRegister }: Props) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const [width, setWidth] = useState(0);

  const { setTokenAndMarkInitialized } = useToken();
  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { googleLogin } = useGoogleLogin();

  // 同じキーのクエリが複数ある場合は、最初の値を取得する
  const queries = Object.fromEntries(
    Object.entries(router.query).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value ?? ''])
  );

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    const id_token = credentialResponse?.credential;

    if (!id_token) {
      console.error('ID Token not found:', credentialResponse);
      return;
    }

    const res = await googleLogin({ id_token: id_token, queries: queries }).catch((error) => {
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

  useEffect(() => {
    const handleResize = () => {
      if (!googleRegister) {
        setWidth(window.innerWidth > 1024 ? 390 : 300);
      } else {
        setWidth(window.innerWidth > 1024 ? 320 : 300);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [googleRegister]);

  return { clientId, onSuccess, onError, width };
};
