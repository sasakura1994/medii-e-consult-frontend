import React from 'react';
import { useRegister } from '@/hooks/useRegister';
import { NextPageWithLayout } from './_app';
import { RegistrationCompleted } from '@/features/registration/RegistrationCompleted';
import { Registration } from '@/features/registration/Registration';

const RegistrationPage: NextPageWithLayout = () => {
  const register = useRegister();
  const { isSent } = register;

  return <>{isSent ? <RegistrationCompleted {...register} /> : <Registration {...register} />}</>;
};

export default RegistrationPage;

RegistrationPage.getLayout = (page: React.ReactElement) => {
  return page;
};
