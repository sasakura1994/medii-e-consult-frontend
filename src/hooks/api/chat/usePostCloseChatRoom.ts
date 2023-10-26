import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostCloseChatRoomRequestData = {
  chat_room_id: string;
  comment: string;
  score: number;
  system_comment: string;
};
export type PostCloseChatRoomResponseData = {
  code: number;
  message: string;
};

export const usePostCloseChatRoom = () => {
  const { axios } = useAxios();

  const closeChatRoom = useCallback(
    (data: PostCloseChatRoomRequestData) => {
      return axios.post<PostCloseChatRoomResponseData>('/chat_room/close_chat_room', data);
    },
    [axios]
  );

  return { closeChatRoom };
};
