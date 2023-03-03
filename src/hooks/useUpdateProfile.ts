import React from 'react';
import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { profileMock } from '@/mocks/profileMock';
import type { KeyedMutator } from 'swr';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const dummyParams = {
  id: 1,
  userId: 1,
  title: 'This is test title',
  body: 'Updated by userId 1',
};

export type UseUpdateProfileType = {
  isSuccess: boolean;
  isError: boolean;
  mutate: KeyedMutator<ProfileEntityType>;
  updateProfile: (data: ProfileEntityType) => void;
};

export const useUpdateProfile = (): UseUpdateProfileType => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const { data: profile, mutate } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<ProfileEntityType>(url); // TODO: res.data に差し替え
      const data = profileMock; // TODO: res.data に差し替え
      return fromNullToUndefined<ProfileEntityType>(data);
    }
  );

  const updateProfile = async (data: ProfileEntityType) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token: dummyToken,
    });

    try {
      await apiClient.put(dummyUrl, dummyParams);
      const updatedData = fromNullToUndefined<ProfileEntityType>(data);
      mutate({ ...profile, ...updatedData }, false);
      setIsSuccess(true);
    } catch (e: unknown) {
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return {
    isSuccess,
    isError,
    mutate,
    updateProfile,
  };
};
