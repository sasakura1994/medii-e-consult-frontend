import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostResolveChatRoomRequestData = {
  chat_room_id: string;
  comment: string;
  score: number;
  system_comment: string;
};
export type PostResolveChatRoomResponseData = {
  code?: number;
  message?: string;
};

export const usePostResolveChatRoom = () => {
  const { axios } = useAxios();

  const resolveChatRoom = useCallback(
    (data: PostResolveChatRoomRequestData) => {
      return axios.post<PostResolveChatRoomResponseData>('/chat_room/resolve_chat_room', data);
    },
    [axios]
  );

  return { resolveChatRoom };
};
