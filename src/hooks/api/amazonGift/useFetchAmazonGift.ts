import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AmazonGiftEntityType } from '../../../features/mypages/amazonGift/amazonGiftEntity';

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
  } = useAuthenticatedSWR<AmazonGiftEntityType[]>('/amazon_gift/amazon_gift_list');

  return {
    isLoading,
    error,
    amazonGifts,
  };
};
