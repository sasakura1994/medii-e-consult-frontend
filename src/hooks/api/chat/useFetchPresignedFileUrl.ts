import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PresignedFileUrlRequestData = {
  chat_room_id: string;
  file_id: string;
};

export type PresignedFileUrlResponseData = {
  url: string;
};

export const useFetchPresignedFileUrl = () => {
  const { axios } = useAxios();

  const fecthPresignedFileUrl = useCallback(
    async (data: PresignedFileUrlRequestData) => {
      return axios.get<PresignedFileUrlResponseData>(
        `/chat_message/presigned_file_url?chat_room_id=${data.chat_room_id}&file_id=${data.file_id}`
      );
    },
    [axios]
  );

  return {
    fecthPresignedFileUrl,
  };
};
