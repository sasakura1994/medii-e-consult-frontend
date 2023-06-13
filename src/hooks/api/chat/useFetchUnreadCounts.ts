import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ChatUnreadCount } from '@/types/entities/chat/ChatUnreadCount';
import { mutate } from 'swr';

const endpoint = '/chat_room/unread_msg_counts';

export type FetchUnreadCountsResponseData = {
  unread_consult: ChatUnreadCount[];
  unread_conference: ChatUnreadCount[];
};

export const mutateFetchUnreadCounts = () => mutate(endpoint);

export const useFetchUnreadCounts = () => {
  const { data } = useAuthenticatedSWR<FetchUnreadCountsResponseData>(endpoint);
  return data;
};
