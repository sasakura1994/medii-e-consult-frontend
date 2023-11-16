import React, { useEffect } from 'react';
import { Login } from '@/hooks/api/auth/useFetchAppleAuthGetToken';

type Props = {
  errorMessage: string;
}

const AuthPage = (props: Props) => {
  const { errorMessage } = props;

  useEffect(() => {
    Login();
  }, []);

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
