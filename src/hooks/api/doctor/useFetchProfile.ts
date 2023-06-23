import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { ProfileEntity } from '@/types/entities/profileEntity';
import { mutate } from 'swr';

const endpoint = '/doctor/profile';

export type UseFetchProfileType = {
  profile?: ProfileEntity;
};

export const mutateFetchProfile = () => {
  mutate(endpoint);
};

export const useFetchProfile = (): UseFetchProfileType => {
  const { data: profile } = useAuthenticatedSWR<ProfileEntity>(endpoint);

  return {
    profile,
  };
};
