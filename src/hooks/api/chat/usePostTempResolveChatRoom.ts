import { useAxios } from '@/hooks/network/useAxios';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

export type TempResolveChatRoomRequestData = {
  chat_room_id: string;
};

export type TempResolveChatRoomResponseData = {
  code: number;
  message: string;
};

export const usePostTempResolveChatRoom = () => {
  const { axios } = useAxios();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const tempResolveChatRoom = useCallback(
    async (data: TempResolveChatRoomRequestData) => {
      setErrorMessage('');
      return await axios.post<TempResolveChatRoomResponseData>('/chat_room/temp_resolve_chat_room', data).catch((e) => {
        const error = e as AxiosError<TempResolveChatRoomResponseData>;
        setErrorMessage(error.response?.data.message);
      });
    },
    [axios]
  );

  return {
    tempResolveChatRoom,
    errorMessage,
  };
};
