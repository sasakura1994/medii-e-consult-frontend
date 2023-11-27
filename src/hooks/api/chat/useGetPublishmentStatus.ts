import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export const useGetPublishmentStatus = (chatRoomId?: string) => {
  const { error, data, mutate } = useAuthenticatedSWR<{
    publishment_accepted: number;
  }>(chatRoomId ? `/chat_room/get_publishment_status?chat_room_id=${chatRoomId}` : null);

  return {
    error,
    mutate,
    data,
  };
};
