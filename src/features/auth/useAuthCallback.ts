import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/network/useAxios';
import { useToken } from '@/hooks/authentication/useToken';

type Query = {
  key: string;
  redirect: string;
};

type LoginRequestData = {
  key: string;
  queries: { [key: string]: string };
};

type LoginResponseData = {
  jwt_token: string;
};

type UseAuthCallback = {
  isFailed: boolean;
};

export const useAuthCallback = (): UseAuthCallback => {
  const router = useRouter();
  const query = router.query as Query;
  const { key, redirect } = query;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { axios } = useAxios();
  const { setTokenAndMarkInitialized } = useToken();

  const parseQuery = useCallback(() => {
    const redirectUrl = decodeURIComponent(redirect);
    const urlParts = redirectUrl.split('?');
    if (urlParts.length < 2) {
      return {};
    }

    const parts = urlParts[1].split(/&/).map((part) => part.split(/=/));
    const queries: { [key: string]: string } = {};
    parts.forEach((part) => {
      queries[part[0]] = part[1];
    });
    return queries;
  }, [redirect]);

  const initialize = useCallback(async () => {
    if (!key || !redirect || isProcessing) {
      return;
    }

    setIsProcessing(true);

    const data: LoginRequestData = { key, queries: parseQuery() };
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
  }, [key, redirect, isProcessing, parseQuery, axios, setTokenAndMarkInitialized, router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { isFailed };
};
