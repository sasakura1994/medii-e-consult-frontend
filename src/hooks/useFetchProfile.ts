import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { profileMock } from '@/mocks/profileMock';
import type { KeyedMutator } from 'swr';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users';

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<ProfileEntityType>;
  profile?: ProfileEntityType;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const {
    isLoading,
    error,
    mutate,
    data: profile,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<ProfileEntityType>(url); // TODO: res を受け取る
      const data = profileMock; // TODO: res.data に差し替え
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
