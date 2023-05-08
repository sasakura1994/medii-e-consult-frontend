import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/doctor/profile';

export type UseFetchProfileType = {
  profile?: ProfileEntityType;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const { data: profile } = useAuthenticatedSWR<ProfileEntityType>(endpoint);

  return {
    profile,
  };
};
