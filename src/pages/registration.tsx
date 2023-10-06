import React from 'react';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';
import { NextPageWithLayout } from './_app';
import { RegistrationCompleted } from '@/features/registration/RegistrationCompleted';
import { Registration } from '@/features/registration/registration';

const RegistrationPage: NextPageWithLayout = () => {
  const register = useRegister();
  const { isSent } = register;

  return <>{isSent ? <RegistrationCompleted {...register} /> : <Registration {...register} />}</>;
};

export default RegistrationPage;

RegistrationPage.getLayout = (page: React.ReactElement) => {
  return page;
};
