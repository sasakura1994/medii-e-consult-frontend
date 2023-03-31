import { useAxios } from '@/hooks/network/useAxios';
import { ChatDraftImageEntity } from '@/types/entities/chat/ChatDraftImageEntity';
import React from 'react';

export type GetChatDraftImagesResponseData = {
  chat_draft_images: ChatDraftImageEntity[];
};

export const useGetChatDraftImages = () => {
  const { axios } = useAxios();

  const getChatDraftImages = React.useCallback(() => {
    return axios.get<GetChatDraftImagesResponseData>(
      '/api/chat_draft_image/chat_draft_images'
    );
  }, [axios]);

  return { getChatDraftImages };
};
