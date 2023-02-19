import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { profileMock } from '@/mocks/mocks';
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
      const res = await apiClient.get<ProfileEntityType>(url);
      const data = profileMock;
      return fromNullToUndefined<ProfileEntityType>(data); // TODO: res.data に差し替え
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
