import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/api/doctor/profile';

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  profile?: ProfileEntityType;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const {
    isLoading,
    error,
    data: profile,
  } = useAuthenticatedSWR<ProfileEntityType>(endpoint);

  return {
    isLoading,
    error,
    profile,
  };
};
