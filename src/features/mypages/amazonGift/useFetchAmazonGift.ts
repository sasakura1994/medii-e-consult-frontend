import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AmazonGiftEntityType } from './amazonGiftEntity';

const endpoint = '/api/amazon_gift/amazon_gift_list';

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
  } = useAuthenticatedSWR<AmazonGiftEntityType[]>(endpoint);

  return {
    isLoading,
    error,
    amazonGifts,
  };
};
