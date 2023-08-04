import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type DeleteChatDraftImageResponseData = {
  cdoe: number;
};

export const useDeleteChatDraftImage = () => {
  const { axios } = useAxios();

  const deleteChatDraftImage = React.useCallback(
    (chatDraftImageId: string) => {
      return axios.delete<DeleteChatDraftImageResponseData>(
        `/chat_draft_image/${chatDraftImageId}`
      );
    },
    [axios]
  );

  return { deleteChatDraftImage };
};
