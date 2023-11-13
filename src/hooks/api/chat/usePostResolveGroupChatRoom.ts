import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostResolveGroupChatRoomRequestData = {
  chat_room_id: string;
  comment: string;
  score: number;
  system_comment: string;
};
export type PostResolveGroupChatRoomResponseData = {
  code?: number;
  message?: string;
};

export const usePostResolveGroupChatRoom = () => {
  const { axios } = useAxios();

  const resolveGroupChatRoom = useCallback(
    (data: PostResolveGroupChatRoomRequestData) => {
      return axios.post<PostResolveGroupChatRoomResponseData>('/chat_room/resolve-group', data);
    },
    [axios]
  );

  return { resolveGroupChatRoom };
};
