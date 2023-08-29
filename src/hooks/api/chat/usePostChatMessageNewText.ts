import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostChatMessageNewTextRequestData = {
  chat_room_id: string;
  message: string;
};

export const usePostChatMessageNewText = () => {
  const { axios } = useAxios();

  const postNewMessage = useCallback(
    (data: PostChatMessageNewTextRequestData) => {
      return axios.post('/chat_message/new_text', data);
    },
    [axios]
  );

  return { postNewMessage };
};
