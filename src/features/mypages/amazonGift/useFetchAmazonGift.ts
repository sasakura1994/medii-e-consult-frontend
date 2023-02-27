import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { amazonGiftsMock } from '@/mocks/mocks';
import type { AmazonGiftEntityType } from './amazonGiftEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/1';

export type UseFetchAmazonGiftType = {
  isLoading: boolean;
  error?: Error;
  amazonGifts?: AmazonGiftEntityType[];
};

export const useFetchAmazonGift = (): UseFetchAmazonGiftType => {
  const {
    isLoading,
    error,
    data: amazonGifts,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      const res = await apiClient.get<AmazonGiftEntityType>(url);
      const data = amazonGiftsMock;

      const amazonGifts = data.map(
        (data) => fromNullToUndefined<AmazonGiftEntityType>(data) // TODO: res.data に差し替え
      );

      return amazonGifts;
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    amazonGifts,
  };
};
