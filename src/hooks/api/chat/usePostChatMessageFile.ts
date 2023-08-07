import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const usePostChatMessageFile = () => {
  const { axios } = useAxios('multipart/form-data');

  const postChatMessageFile = useCallback(
    async (chatRoomId: string, file: File) => {
      const formData = new FormData();
      formData.append('chat_room_id', chatRoomId);
      formData.append('uploaded_file', file);

      return axios.post('/chat_room/new_file', formData);
    },
    [axios]
  );

  return { postChatMessageFile };
};
