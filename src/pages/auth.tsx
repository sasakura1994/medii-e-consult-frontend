import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchAppleAuthGetToken } from '@/hooks/api/auth/useFetchAppleAuthGetToken';
import { useLogin } from '@/hooks/useLogin';
import { useToken } from '@/hooks/authentication/useToken';

type Query = {
  token: string;
};

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { setTokenAndMarkInitialized } = useToken();
  const { token } = router.query as Query;
  const { fetchAppleAuthGetToken } = useFetchAppleAuthGetToken();

  const login = useCallback(async () => {
    fetchAppleAuthGetToken({ token_id: token })
      .then((res) => {
        const { jwt_token, login_type } = res.data;
        setTokenAndMarkInitialized(jwt_token);
        if (login_type==="register") router.push(redirectUrl === '' ? 'top' : redirectUrl);
        else router.push('editprofile?registerMode=1');
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Login failed');
      });
  }, [fetchAppleAuthGetToken, router, token]);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <div className="flex h-screen justify-center bg-bg">
      <div className="mb-12 mt-6">
        <div>loading...</div>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default AuthPage;
