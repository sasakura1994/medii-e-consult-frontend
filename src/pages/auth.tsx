import React, { useEffect } from 'react';
import { Login } from '@/hooks/api/auth/useFetchAppleAuthGetToken';

const AuthPage = () => {

  useEffect(() => {
    Login();
  }, []);

  return (
    <div className="flex h-screen justify-center bg-bg">
      <div className="mb-12 mt-6">
        <div>loading...</div>
      </div>
    </div>
  );
};

export default AuthPage;
