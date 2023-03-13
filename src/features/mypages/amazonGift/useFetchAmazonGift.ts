import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import type { KeyedMutator } from 'swr';
import type { AmazonGiftEntityType } from './amazonGiftEntity';

const endpoint = '/api/amazon_gift/amazon_gift_list';

export type UseFetchAmazonGiftType = {
  isLoading: boolean;
  error?: Error;
  amazonGifts?: AmazonGiftEntityType[];
  mutate: KeyedMutator<AmazonGiftEntityType[] | undefined>;
};

export const useFetchAmazonGift = (token: string): UseFetchAmazonGiftType => {
  const {
    isLoading,
    error,
    data: amazonGifts,
    mutate,
  } = useSWR(
    [endpoint, token],
    async ([url, token]) => {
      if (!token) return;

      const apiClient = createApiClient({ token });
      const { data } = await apiClient.get<AmazonGiftEntityType[]>(url);

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
