import { useRouter } from 'next/router';
import { useFetchChatRoom } from './../../../hooks/api/chat/useFetchChatRoom';
import React from 'react';

type Query = {
  id?: string;
};

export const useAssign = () => {
  const router = useRouter();
  const { id } = router.query as Query;

  const [isConfirming, setIsConfirming] = React.useState(false);

  const fetchChatRoomResult = useFetchChatRoom(id);
  const { data: fetchChatRoomResultData } = fetchChatRoomResult || {};
  const { chat_room: chatRoom, images } = fetchChatRoomResultData || {};

  const assign = React.useCallback(() => {
    return;
  }, [id]);

  return { assign, chatRoom, images, isConfirming, setIsConfirming };
};
