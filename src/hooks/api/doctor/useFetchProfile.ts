import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { ProfileEntity } from '@/types/entities/profileEntity';

const endpoint = '/doctor/profile';

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  profile?: ProfileEntity;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const {
    isLoading,
    error,
    data: profile,
  } = useAuthenticatedSWR<ProfileEntity>(endpoint);

  return {
    isLoading,
    error,
    profile,
  };
};
