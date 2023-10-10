import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type EditPasswordArgs = {
  password: string;
  token: string | undefined;
};

export type PatchEditPasswordResponseData = {
  code: number;
  message: string;
};

export const usePatchEditPassword = () => {
  const { axios } = useAxios();

  const editPassword = useCallback(
    (data: EditPasswordArgs) => {
      return axios.patch<PatchEditPasswordResponseData>(
        '/account/confirm_email',
        data
      );
    },
    [axios]
  );

  return { 
    editPassword,
  };
};
