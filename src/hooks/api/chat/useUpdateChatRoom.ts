import { useAxios } from '@/hooks/network/useAxios';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const updateChatRoom = useCallback(
    async (data: UpdateChatRoomRequestData) => {
      try {
        setErrorMessage('');
        return await axios.post<UpdateChatRoomResponseData>('/chat_room/update_chat_room', data);
      } catch (e) {
        const error = e as AxiosError<UpdateChatRoomResponseData>;
        setErrorMessage(error.response?.data.message);
      }
    },
    [axios]
  );

  return {
    updateChatRoom,
    errorMessage,
  };
};
