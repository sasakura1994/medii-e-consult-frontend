import { useCallback } from 'react';
import { useAxios } from '@/hooks/network/useAxios';
import type { ProfileEntity } from '@/types/entities/profileEntity';

const endpoint = '/doctor/upload_document';

export const useUploadDocument = () => {
  const { axios } = useAxios('multipart/form-data');

  const uploadDocument = useCallback(
    (data: ProfileEntityType) => {
      return axios.post<ProfileEntityType>(endpoint, data);
    },
    [axios]
  );

  return { uploadDocument };
};
