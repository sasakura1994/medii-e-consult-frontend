import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

type UpdateChatRoomDraftRequestData = {
  data: object;
};

export const useUpdateChatRoomDraft = () => {
  const { axios } = useAxios();

  const updateChatRoomDraft = useCallback(
    (chatRoomDraftId: string, data: object) => {
      const requestData: UpdateChatRoomDraftRequestData = { data };
      return axios.patch(`/chat-room-draft/${chatRoomDraftId}`, requestData);
    },
    [axios]
  );

  return { updateChatRoomDraft };
};
