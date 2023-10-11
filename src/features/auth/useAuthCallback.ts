import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/network/useAxios';
import { useToken } from '@/hooks/authentication/useToken';

type Query = {
  key: string;
  redirect: string;
};

type LoginResponseData = {
  jwt_token: string;
};

type UseAuthCallback = {
  isFailed: boolean;
  isPublicPage: boolean;
};

export const useAuthCallback = (): UseAuthCallback => {
  const router = useRouter();
  const { key, redirect } = router.query as Query;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isPublicPage, setIsPublicPage] = useState(false);
  const { axios } = useAxios();
  const { setTokenAndMarkInitialized } = useToken();

  const initialize = useCallback(async () => {
    if (!key || !redirect || isProcessing) {
      return;
    }

    setIsProcessing(true);

    const data = { key };
    const response = await axios.post<LoginResponseData>('/nmo/login', data).catch((error) => {
      console.error(error);
      return null;
    });
    if (!response) {
      setIsFailed(true);
      return;
    }

    setTokenAndMarkInitialized(response.data.jwt_token);
    router.push(redirect);
  }, [key, redirect, isProcessing, axios, setTokenAndMarkInitialized, router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { isFailed, isPublicPage };
};
