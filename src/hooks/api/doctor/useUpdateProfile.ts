import React from 'react';
import { useAxios } from '@/hooks/network/useAxios';
import type { ProfileEntity } from '@/types/entities/profileEntity';

const endpoint = '/api/doctor/update_profile';

export type UseUpdateProfileType = {
  isSuccess: boolean;
  isError: boolean;
  updateProfile: (data: ProfileEntity | undefined) => void;
};

export const useUpdateProfile = (): UseUpdateProfileType => {
  const { axios } = useAxios('multipart/form-data');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const updateProfile = async (data: ProfileEntity | undefined) => {
    if (!data) return;

    setIsSuccess(false);
    setIsError(false);

    try {
      await axios.post(endpoint, data);
      setIsSuccess(true);
    } catch (e: unknown) {
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return {
    isSuccess,
    isError,
    updateProfile,
  };
};
