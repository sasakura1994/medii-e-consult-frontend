import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/network/useAxios';
import { useToken } from '@/hooks/authentication/useToken';

type Query = {
  key: string;
  ttl: string;
  redirect: string;
};

type LoginResponseData = {
  jwt_token: string;
};

type UseAuthCallback = {
  isFailed: boolean;
};

export const useAuthCallback = (): UseAuthCallback => {
  const router = useRouter();
  const { key, ttl, redirect } = router.query as Query;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { axios, hasToken } = useAxios();
  const { setTokenAndMarkInitialized } = useToken();

  const initialize = useCallback(async () => {
    if (!key || !ttl || !redirect || isProcessing || !hasToken) {
      return;
    }

    setIsProcessing(true);

    const data = { key, ttl };
    const response = await axios
      .post<LoginResponseData>('/nmo/login', data)
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (!response) {
      setIsFailed(true);
      return;
    }

    setTokenAndMarkInitialized(response.data.jwt_token);
    router.push(redirect);
  }, [
    key,
    ttl,
    redirect,
    isProcessing,
    hasToken,
    axios,
    setTokenAndMarkInitialized,
    router,
  ]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { isFailed };
};
