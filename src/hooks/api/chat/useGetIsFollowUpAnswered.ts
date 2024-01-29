import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

type ResponseData = {
  answered: boolean;
};

export const useGetIsFollowUpAnswered = (chatRoomId?: string) => {
  const { error, data, mutate } = useAuthenticatedSWR<ResponseData>(
    chatRoomId ? `/chat_room/${chatRoomId}/is-follow-up-answered` : null
  );

  return {
    error,
    mutate,
    answered: data?.answered,
  };
};
