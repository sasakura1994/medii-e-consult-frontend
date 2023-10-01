import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';

export type updateOpenStatusResponseData = {
  apiServerUrl: string;
  chatRoomId: string;
  createTokenHeader: () => void;
};

export const useUpdateOpenStatus = (chatRoomID?: string) => {
  const { axios } = useAxios();

  const updateOpenStatus = useCallback(async () => {
    try {
      const response = await axios.patch<updateOpenStatusResponseData>(
        `recruitment/${chatRoomID}/open-status`,
        {}
      );
    } catch (error) {
      console.error(error);
    }
  }, [axios, chatRoomID]);

  return { updateOpenStatus };
};
