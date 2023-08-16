import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostChatMessageNewFilesRequestData = {
  chat_room_id: string;
  uploaded_file: File;
};

export type PostChatMessageNewFilesResponseData = {
  code: number;
};

export const usePostChatMessageNewFiles = () => {
  const { axios } = useAxios();

  const postNewFile = useCallback(
    (data: PostChatMessageNewFilesRequestData) => {
      const formData = new FormData();
      formData.append('uploaded_file', data.uploaded_file);
      formData.append('chat_room_id', data.chat_room_id);
      return axios.post<PostChatMessageNewFilesResponseData>('/chat_message/new_files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    [axios]
  );

  return { postNewFile };
};
