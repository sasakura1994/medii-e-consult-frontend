import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';

type useFetchChatRoomListProps = {
  query: string[];
};

export const useFetchChatRoomList = (props: useFetchChatRoomListProps) => {
  const { query } = props;
  const queryStr = query.join('+');
  const { error, data, mutate } = useAuthenticatedSWR<ChatRoomEntity[]>(
    queryStr ? `/chat_room/chat_room_list?room_type=${queryStr}` : null
  );

  return {
    error,
    mutate,
    data,
  };
};
