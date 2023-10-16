import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';
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

export const useGetIsTokenExists = () => {
  const isTokenExists = useCallback(
    (data: IsTokenExistsArgs) => {
      return useAuthenticatedSWR<GetIsTokenExistsResponseData>(
        `/account/has_email_updating?token=${data.token}`,
      );
    },
    [useAuthenticatedSWR]
  );

  return { isTokenExists };
  
};
