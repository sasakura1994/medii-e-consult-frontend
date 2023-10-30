import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type DeleteMessageRequestData = {
  chat_room_id: string;
  uid: number;
};

export const useDeleteMessage = () => {
  const { axios } = useAxios();

  const deleteChat = useCallback(
    (data: DeleteMessageRequestData) => {
      return axios.post('/chat_message/delete_message', data);
    },
    [axios]
  );

  return { deleteChat };
};
