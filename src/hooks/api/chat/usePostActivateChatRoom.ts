import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type ActivateChatRoomRequestData = {
  chat_room_id: string;
};

export type ActivateChatRoomResponseData = {
  code: number;
  message: string;
};

export const usePostActivateChatRoom = () => {
  const { axios } = useAxios();

  const activateChatRoom = useCallback(
    async (data: ActivateChatRoomRequestData) => {
      return axios.post<ActivateChatRoomResponseData>('/chat_room/activate_chat_room', data);
    },
    [axios]
  );

  return {
    activateChatRoom,
  };
};
