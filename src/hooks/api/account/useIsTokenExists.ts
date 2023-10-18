import type { AxiosError } from 'axios';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type IsTokenExistsArgs = {
  token: string | undefined;
};

export type GetIsTokenExistsResponseData = {
  has_email_updating: boolean;
};

export type GetIsTokenExistsResponseType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  data: GetIsTokenExistsResponseData | undefined;
};

export const useGetIsTokenExists = (token?: string) => {
  const { error, data, mutate } = useAuthenticatedSWR<GetIsTokenExistsResponseData>(
    `/account/has_email_updating?token=${token}`
  );

  return { error, data, mutate };
};
