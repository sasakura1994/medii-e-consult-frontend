import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export const useCanAnswer = (chatRoomId?: string) => {
  return useAuthenticatedSWR<{ enable: boolean }>(
    chatRoomId ? `/chat_room/can-answer?chat_room_id=${chatRoomId}` : null
  );
};
