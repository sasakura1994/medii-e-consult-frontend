import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type PostChatRoomResponseData = {
  code: number;
  chat_room_id?: string;
  message: string;
};

export const usePostDraftImage = () => {
  const { axios } = useAxios('multipart/form-data');

  const createDraftImage = React.useCallback(
    (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post<PostChatRoomResponseData>(
        '/chat_draft_image/store',
        formData
      );
    },
    [axios]
  );

  return { createDraftImage };
};
