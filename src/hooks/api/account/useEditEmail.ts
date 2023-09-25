import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const useEditEmail = () => {
  const { axios } = useAxios();

  const editEmail = useCallback(
    (data: FormData) => {
      return axios.post('/account/update_email', data);
    },
    [axios]
  );

  return {
    editEmail,
  };
};
