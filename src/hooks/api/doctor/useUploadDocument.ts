import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';
import type { ProfileEntity } from '@/types/entities/profileEntity';

const endpoint = '/doctor/upload_document';

export const useUploadDocument = () => {
  const { axios } = useAxios('multipart/form-data');

  const uploadDocument = useCallback(
    (data: ProfileEntity) => {
      return axios.post<ProfileEntity>(endpoint, data);
    },
    [axios]
  );

  return { uploadDocument };
};
