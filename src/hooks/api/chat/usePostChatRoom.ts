import { useAxios } from '@/hooks/network/useAxios';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import React from 'react';

export type PostChatRoomRequestData = NewChatRoomEntity & {
  chat_draft_image_ids: string[];
  re_consult_chat_room_id?: string;
  re_consult_file_chat_message_ids?: number[];
  create_source?: { [key: string]: string };
};

export type PostChatRoomResponseData = {
  code: number;
  chat_room_id?: string;
  message: string;
};

export const usePostChatRoom = () => {
  const { axios } = useAxios();

  const createNewChatRoom = React.useCallback(
    (data: PostChatRoomRequestData) => {
      return axios.post<PostChatRoomResponseData>('/chat_room/new_chat_room', data);
    },
    [axios]
  );

  return { createNewChatRoom };
};
