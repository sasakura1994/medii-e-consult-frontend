import React from 'react';
import { getAuthToken } from '@/libs/cookie';
import { useRecoilState } from 'recoil';
import {
  isTokenInitializedState,
  tokenState,
} from '@/globalStates/profileState';

type UseToken = {
  token: string;
  isTokenInitialized: boolean;
  setTokenAndMarkInitialized: (token: string) => void;
};

export const useToken = (): UseToken => {
  const [token, setToken] = useRecoilState(tokenState);
  const [isTokenInitialized, setIsTokenInitialized] = useRecoilState(
    isTokenInitializedState
  );

  React.useEffect(() => {
    const storageToken = getAuthToken();
    setToken(storageToken || '');
    setIsTokenInitialized(true);
  }, []);

  const setTokenAndMarkInitialized = React.useCallback((token: string) => {
    setToken(token);
    setIsTokenInitialized(true);
  }, []);

  return { token, isTokenInitialized, setTokenAndMarkInitialized };
};
