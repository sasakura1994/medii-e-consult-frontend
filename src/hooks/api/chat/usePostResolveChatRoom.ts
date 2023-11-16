import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostResolveChatRoomRequestData = {
  chat_room_id: string;
  quality_score: 0 | 1 | 2 | 3 | 4 | 5;
  speed_score: 0 | 1 | 2 | 3 | 4 | 5;
  repeat_score: 0 | 1 | 2 | 3 | 4 | 5;
  responder_comment: string;
  system_score: 0 | 1 | 2 | 3 | 4 | 5;
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
