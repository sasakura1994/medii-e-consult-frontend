import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostUpdateReadUntilRequestData = {
  chat_room_id: string;
  uid: number;
};

export const usePostUpdateReadUntil = () => {
  const { axios } = useAxios();

  const updateReadUntil = useCallback(
    (data: PostUpdateReadUntilRequestData) => {
      return axios.post('/chat_message/update_read_until', data);
    },
    [axios]
  );

  return { updateReadUntil };
};
