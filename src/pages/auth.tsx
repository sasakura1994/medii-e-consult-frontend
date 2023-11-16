import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchAppleAuthGetToken } from '@/hooks/api/auth/useFetchAppleAuthGetToken';
import { setAuthToken } from '@/libs/cookie';
import { useLogin } from '@/hooks/useLogin';

type Query = {
  token: string;
};

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { redirectUrl } = useLogin();
  const { token } = router.query as Query;
  const { fetchAppleAuthGetToken } = useFetchAppleAuthGetToken();

  const login = useCallback(async () => {
    fetchAppleAuthGetToken({ token_id: token })
      .then((res) => {
        if (res.status === 200) {
          const { jwt_token, login_type } = res.data;
          // ここでcookieにjwt_tokenをセットする
          setAuthToken(jwt_token);
          if (login_type==="register") router.push(redirectUrl === '' ? 'top' : redirectUrl);
          else router.push('editprofile?registerMode=1');
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
