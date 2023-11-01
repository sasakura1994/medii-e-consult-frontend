import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostUpdatePublishmentParamRequestData = {
  chat_room_id: string;
  is_allowed: 0 | 1;
};

export type PostUpdatePublishmentParamResponseData = {
  code: number;
  message: string;
};

export const usePostUpdatePublishmentParam = () => {
  const { axios } = useAxios();

  const updatePublishmentParam = useCallback(
    async (data: PostUpdatePublishmentParamRequestData) => {
      return await axios.post<PostUpdatePublishmentParamResponseData>('/chat_room/update_publishment_param', data);
    },
    [axios]
  );

  return {
    updatePublishmentParam,
  };
};
