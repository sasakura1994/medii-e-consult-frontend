import { ReviewScoreNumber } from '@/features/chat/ResolveChatRoomModal';
import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostResolveChatRoomRequestData = {
  chat_room_id: string;
  quality_score: ReviewScoreNumber;
  speed_score: ReviewScoreNumber;
  repeat_score: ReviewScoreNumber;
  responder_comment: string;
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
