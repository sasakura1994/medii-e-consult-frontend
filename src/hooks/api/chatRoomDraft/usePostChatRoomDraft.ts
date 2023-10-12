import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

type PostChatRoomDraftRequestData = {
  data: object;
};

type PostChatRoomDraftResponeData = {
  chat_room_draft_id: string;
};

export const usePostChatRoomDraft = () => {
  const { axios } = useAxios();

  const postChatRoomDraft = useCallback(
    (data: object) => {
      const requestData: PostChatRoomDraftRequestData = { data };
      return axios.post<PostChatRoomDraftResponeData>('/chat-room-draft', requestData);
    },
    [axios]
  );

  return { postChatRoomDraft };
};
