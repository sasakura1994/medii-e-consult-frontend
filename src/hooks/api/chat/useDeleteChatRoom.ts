import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type DeleteChatRoomRequestData = {
  chat_room_id: string;
};

export const useDeleteChatRoom = () => {
  const { axios } = useAxios();

  const deleteChatRoom = useCallback(
    (data: DeleteChatRoomRequestData) => {
      return axios.post('/chat_room/delete_chat_room', data);
    },
    [axios]
  );

  return { deleteChatRoom };
};
