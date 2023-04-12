import { useRouter } from 'next/router';
import { useFetchChatRoom } from './../../../hooks/api/chat/useFetchChatRoom';

type Query = {
  id?: string;
};

export const useAssign = () => {
  const router = useRouter();
  const { id } = router.query as Query;
  const fetchChatRoomResult = useFetchChatRoom(id);
  const { data: fetchChatRoomResultData } = fetchChatRoomResult || {};
  const { chat_room: chatRoom, images } = fetchChatRoomResultData || {};

  return { chatRoom, images };
};
