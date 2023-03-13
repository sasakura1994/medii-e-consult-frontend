import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import type { KeyedMutator } from 'swr';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/api/doctor/profile';

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<ProfileEntityType | undefined>;
  profile?: ProfileEntityType;
};

export const useFetchProfile = (token: string): UseFetchProfileType => {
  const {
    isLoading,
    error,
    mutate,
    data: profile,
  } = useSWR(
    [endpoint, token],
    async ([url, token]) => {
      if (!token) return;

      const apiClient = createApiClient({ token });
      const { data } = await apiClient.get<ProfileEntityType>(url);
      return fromNullToUndefined<ProfileEntityType>(data);
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    mutate,
    profile,
  };
};
