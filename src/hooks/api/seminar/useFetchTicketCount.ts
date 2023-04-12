import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import type { AxiosError } from 'axios';

export type UseFetchTicketCountType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  ticketCount: ticketCountEntity | undefined;
};

const endpoint = '/api/seminar/ticket_count';

export const useFetchTicketCount = (): UseFetchTicketCountType => {
  const {
    isLoading,
    error,
    data: ticketCount,
  } = useAuthenticatedSWR<ticketCountEntity>(endpoint);

  return {
    isLoading,
    error,
    ticketCount,
  };
};
