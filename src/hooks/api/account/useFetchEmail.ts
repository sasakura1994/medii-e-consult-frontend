import React from 'react';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useRecoilState } from 'recoil';
import { emailState } from '@/globalStates/emailState';
import type { AxiosError } from 'axios';
import type { EmailEntityType } from '@/types/entities/emailEntity';

export type UseFetchEmailType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  data: EmailEntityType | undefined;
};

const endpoint = '/api/account/email';

export const useFetchEmail = () => {
  const [email, setEmail] = useRecoilState(emailState);

  const { isLoading, error, data } =
    useAuthenticatedSWR<EmailEntityType>(endpoint);

  React.useEffect(() => {
    setEmail((oldValues) => ({
      ...oldValues,
      ...data,
    }));
  }, [data]);

  return {
    isLoading,
    error,
    email,
  };
};
