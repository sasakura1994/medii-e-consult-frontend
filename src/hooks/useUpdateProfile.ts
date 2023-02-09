import React from 'react';
import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { profileMock } from '@/mocks/profileMock';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const dummyParams = {
  id: 1,
  userId: 1,
  title: 'This is test title',
  body: 'Updated by userId 1',
};

type UseUpdateProfileType = {
  isSuccess: boolean;
  isError: boolean;
  updateProfile: (data: ProfileEntityType) => void;
};

export const useUpdateProfile = (): UseUpdateProfileType => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const { data: profile, mutate } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      const res = await apiClient.get<ProfileEntityType>(url);
      const data = profileMock;
      return fromNullToUndefined<ProfileEntityType>(data); // TODO: res.data に差し替え
    }
  );

  const updateProfile = async (data: ProfileEntityType) => {
    setIsSuccess(false);
    setIsError(false);

    const apiClient = createApiClient({
      token: dummyToken,
    });

    try {
      const res = await apiClient.put(dummyUrl, dummyParams);
      const updatedData = fromNullToUndefined<ProfileEntityType>(data);
      if (!updatedData) {
        return;
      }

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
    updateProfile,
  };
};
