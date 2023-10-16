import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const useDeleteChatRoomDrafts = () => {
  const { axios } = useAxios();

  const deleteChatRoomDrafts = useCallback(() => {
    return axios.delete('/chat-room-draft');
  }, [axios]);

  return { deleteChatRoomDrafts };
};
