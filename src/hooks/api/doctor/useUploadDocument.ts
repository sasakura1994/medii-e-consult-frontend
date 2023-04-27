import { useState } from 'react';
import { useAxios } from '@/hooks/network/useAxios';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const endpoint = '/doctor/upload_document';

export type UseUploadDocument = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  uploadDocument: (data: ProfileEntityType | undefined) => void;
  error: string | null;
};

export const useUploadDocument = (): UseUploadDocument => {
  const { axios } = useAxios('multipart/form-data');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadDocument = (data: ProfileEntityType | undefined) => {
    if (!data) return;

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    axios
      .post(endpoint, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsSuccess(true);
        }
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        setIsError(true);
      });
  };

  return {
    isLoading,
    isError,
    isSuccess,
    uploadDocument,
    error,
  };
};
