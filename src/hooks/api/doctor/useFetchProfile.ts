import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { ProfileEntity } from '@/types/entities/profileEntity';

const endpoint = '/doctor/profile';

export type UseFetchProfileType = {
  profile?: ProfileEntity;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const { data: profile } = useAuthenticatedSWR<ProfileEntity>(endpoint);

  return {
    profile,
  };
};
