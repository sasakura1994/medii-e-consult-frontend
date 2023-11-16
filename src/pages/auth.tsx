import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchAppleAuthGetToken } from '@/hooks/api/auth/useFetchAppleAuthGetToken';
import { useToken } from '@/hooks/authentication/useToken';

type Query = {
  token: string;
};

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { token } = router.query as Query;
  const { setTokenAndMarkInitialized } = useToken();
  const { fetchAppleAuthGetToken } = useFetchAppleAuthGetToken();

  const login = useCallback(async () => {
    fetchAppleAuthGetToken({ token_id: token })
      .then((res) => {
        const { jwt_token, login_type } = res.data;
        setTokenAndMarkInitialized(jwt_token);
        if (login_type === 'register') {
          router.push('/editprofile?registerMode=1');
        } else {
          router.push('/top');
        }
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
    <div>
      <div>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div>loading...</div>
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
