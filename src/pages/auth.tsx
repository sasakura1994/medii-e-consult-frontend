import React, { useEffect } from 'react';
import { Login } from '@/hooks/api/auth/useFetchAppleAuthGetToken';
import { NextPageWithLayout } from './_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';


const AuthPage: NextPageWithLayout = () => {
  const { errorMessage } = Login();

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

AuthPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default AuthPage;
