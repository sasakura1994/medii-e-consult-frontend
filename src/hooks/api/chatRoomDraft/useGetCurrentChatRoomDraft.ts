import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type GetCurrentChatRoomDraftResponeData = {
  chat_room_draft_id: string;
  data: object;
};

export const useGetCurrentChatRoomDraft = () => {
  const { axios } = useAxios();

  const getCurrentChatRoomDraft = useCallback(() => {
    return axios.get<GetCurrentChatRoomDraftResponeData>('/chat-room-draft/current');
  }, [axios]);

  return { getCurrentChatRoomDraft };
};
