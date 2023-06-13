import React from 'react';
import { useAxios } from '@/hooks/network/useAxios';

type ResponseData = {
  code: number;
  message?: string;
};

export const usePostAssign = () => {
  const { axios } = useAxios();

  const assign = React.useCallback(
    (chatRoomId: string) => {
      return axios.post<ResponseData>('/chat_room/assing_to_me', {
        chat_room_id: chatRoomId,
      });
    },
    [axios]
  );

  return { assign };
};
