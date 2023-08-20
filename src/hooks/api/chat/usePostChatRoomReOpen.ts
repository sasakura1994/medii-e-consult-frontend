import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostChatRoomReOpenRequestData = {
  chat_room_id: string;
  reason?: string;
};

export const usePostChatRoomReOpen = () => {
  const { axios } = useAxios();

  const reOpenChatRoom = useCallback(
    (data: PostChatRoomReOpenRequestData) => {
      return axios.post('/chat_room/reopen', data);
    },
    [axios]
  );

  return { reOpenChatRoom };
};
