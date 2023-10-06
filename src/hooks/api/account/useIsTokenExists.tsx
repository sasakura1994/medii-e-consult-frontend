import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type IsTokenExistsArgs = {
  token: string | undefined;
};

export type GetIsTokenExistsResponseData = {
  has_email_updating: boolean;
};

export const useGetIsTokenExists = () => {
  const { axios } = useAxios();
  const isTokenExists = useCallback(
    (data: IsTokenExistsArgs) => {
      return axios.get<GetIsTokenExistsResponseData>(
        `/account/has_email_updating?token=${data.token}`,
      )
    },
    [axios]
  );

  return { isTokenExists };
}