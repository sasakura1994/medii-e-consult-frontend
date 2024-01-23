import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export const useMarkFollowUpAnswered = () => {
  const { axios } = useAxios();

  const markFollowUpAnswered = useCallback(
    async (chatRoomId: string) => {
      return axios.patch(`/chat_room/${chatRoomId}/mark-follow-up-answered`);
    },
    [axios]
  );

  return {
    markFollowUpAnswered,
  };
};
