import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/api/doctor/update_profile';

export type UseUpdateProfileType = {
  isSuccess: boolean;
  isError: boolean;
  updateProfile: (data: ProfileEntityType) => void;
};

export const useUpdateProfile = (token: string): UseUpdateProfileType => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const updateProfile = async (data: ProfileEntityType) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({ token });

    try {
      await apiClient.post(endpoint, data);
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
