import React from 'react';
import { useRegister } from '@/hooks/useRegister';
import { NextPageWithLayout } from './_app';
import { RegistrationCompleted } from '@/features/registration/RegistrationCompleted';
import { Registration } from '@/features/registration/Registration';
import { NmoRegistrationAgainMessageModal } from '@/features/registration/NmoRegistraionAgainMessageModal';

const RegistrationPage: NextPageWithLayout = () => {
  const register = useRegister();
  const { isSent, from } = register;

  return (
    <>
      {isSent ? <RegistrationCompleted {...register} /> : <Registration {...register} />}
      {from === 'nmo_registration_again' && <NmoRegistrationAgainMessageModal />}
    </>
  );
};

export default RegistrationPage;

RegistrationPage.getLayout = (page: React.ReactElement) => {
  return page;
};
