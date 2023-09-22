import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostChatRoomSendResponseRequestRequestData = {
  chat_room_id: string;
};

export type PostChatRoomSendResponseRequestResponseData = {
  code: number;
  message: string | null;
};

export const usePostChatRoomSendResponseRequest = () => {
  const { axios } = useAxios();

  const sendResponseRequest = useCallback(
    (data: PostChatRoomSendResponseRequestRequestData) => {
      return axios.post<PostChatRoomSendResponseRequestResponseData>('/chat_room/send_response_request', data);
    },
    [axios]
  );

  return { sendResponseRequest };
};
