import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const useUpdateProfile = () => {
  const { axios } = useAxios('multipart/form-data');

  const updateProfile = useCallback(
    async (data: FormData) => {
      await axios.post('/doctor/update_profile', data);
    },
    [axios]
  );

  return {
    updateProfile,
  };
};
