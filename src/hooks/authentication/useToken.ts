import React from 'react';
import { getAuthToken, setAuthToken } from '@/libs/cookie';
import { useRecoilState } from 'recoil';
import {
  isTokenInitializedState,
  isTokenRefreshedState,
  tokenState,
} from '@/globalStates/profileState';

type UseToken = {
  token: string;
  isTokenInitialized: boolean;
  isTokenRefreshed: boolean;
  setIsTokenRefreshed: (isTokenRefreshed: boolean) => void;
  setTokenAndMarkInitialized: (token: string) => void;
};

export const useToken = (): UseToken => {
  const [token, setToken] = useRecoilState(tokenState);
  const [isTokenInitialized, setIsTokenInitialized] = useRecoilState(
    isTokenInitializedState
  );
  const [isTokenRefreshed, setIsTokenRefreshed] = useRecoilState(
    isTokenRefreshedState
  );

  React.useEffect(() => {
    const storageToken = getAuthToken();
    setToken(storageToken || '');
    setIsTokenInitialized(true);
    // 初期化のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTokenAndMarkInitialized = React.useCallback((token: string) => {
    setAuthToken(token);
    setToken(token);
    setIsTokenInitialized(true);
    // setのみのため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    token,
    isTokenInitialized,
    isTokenRefreshed,
    setIsTokenRefreshed,
    setTokenAndMarkInitialized,
  };
};
