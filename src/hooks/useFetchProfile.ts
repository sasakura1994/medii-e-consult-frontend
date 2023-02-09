import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { profileMock } from '@/mocks/profileMock';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/8';

type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  profile?: ProfileEntityType;
};

export const useFetchProfile = (): UseFetchProfileType => {
  const {
    isLoading,
    error,
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
    profile,
  };
};
