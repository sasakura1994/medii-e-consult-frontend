import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type UpdateChatRoomRequestData = {
  age: number | null;
  chat_room_id: string;
  disease_name: string;
  gender: 'man' | 'woman';
  content?: string;
  title?: string;
};

export type UpdateChatRoomResponseData = {
  code: number;
  message: string;
};

export const useUpdateChatRoom = () => {
  const { axios } = useAxios();

  const updateChatRoom = useCallback(
    async (data: UpdateChatRoomRequestData) => {
      return await axios.post<UpdateChatRoomResponseData>('/chat_room/update_chat_room', data);
    },
    [axios]
  );

  return {
    updateChatRoom,
  };
};
