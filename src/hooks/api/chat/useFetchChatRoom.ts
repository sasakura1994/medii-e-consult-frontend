import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';

export type FetchChatRoomResponseData = {
  chat_room: ChatRoomEntity;
  assigned_to_me: boolean;
  images: string[];
  members: ChatMemberEntity[];
  me: ChatMemberEntity | null;
};

export const useFetchChatRoom = (chatRoomId?: string) => {
  const { isLoading, error, data, mutate } = useAuthenticatedSWR<FetchChatRoomResponseData>(
    chatRoomId ? `/chat_room/chat_room?chat_room_id=${chatRoomId}` : null
  );

  return {
    isLoading,
    error,
    mutate,
    data,
  };
};
