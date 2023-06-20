import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const useUpdateProfile = () => {
  const { axios } = useAxios('multipart/form-data');

  const updateProfile = useCallback(
    (data: FormData) => {
      return axios.post('/doctor/update_profile', data);
    },
    [axios]
  );

  return {
    updateProfile,
  };
};
