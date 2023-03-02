import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { amazonGiftsMock } from './amazonGiftMock';
import type { KeyedMutator } from 'swr';
import type { AmazonGiftEntityType } from './amazonGiftEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/4';

export type UseFetchAmazonGiftType = {
  isLoading: boolean;
  error?: Error;
  amazonGifts?: AmazonGiftEntityType[];
  mutate: KeyedMutator<AmazonGiftEntityType[]>;
};

export const useFetchAmazonGift = (): UseFetchAmazonGiftType => {
  const {
    isLoading,
    error,
    data: amazonGifts,
    mutate,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<AmazonGiftEntityType>(url); // TODO: res を受け取る
      const data = amazonGiftsMock; // TODO: res.data として変数にセット

      const amazonGifts = data.map((data) =>
        fromNullToUndefined<AmazonGiftEntityType>(data)
      );

      return amazonGifts;
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    amazonGifts,
    mutate,
  };
};
