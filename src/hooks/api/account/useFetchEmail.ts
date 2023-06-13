import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { EmailEntityType } from '@/types/entities/emailEntity';

export type UseFetchEmailType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  data: EmailEntityType | undefined;
};

const endpoint = '/account/email';

export const useFetchEmail = () => {
  const {
    isLoading,
    error,
    data: email,
  } = useAuthenticatedSWR<EmailEntityType>(endpoint);

  return {
    isLoading,
    error,
    email,
  };
};
