import React from 'react';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/api/doctor/profile';

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  profile?: ProfileEntityType;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const [profile, setProfile] = useRecoilState(profileState);

  const { isLoading, error, data } =
    useAuthenticatedSWR<ProfileEntityType>(endpoint);

  React.useEffect(() => {
    setProfile((oldValues) => ({
      ...oldValues,
      ...data,
    }));
  }, [data]);

  return {
    isLoading,
    error,
    profile,
  };
};
