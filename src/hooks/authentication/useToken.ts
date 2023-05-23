import { useCallback, useEffect } from 'react';
import {
  getAccountIdFromToken,
  getAuthToken,
  setAuthToken,
} from '@/libs/cookie';
import { useRecoilState } from 'recoil';
import {
  isTokenInitializedState,
  isTokenRefreshedState,
  tokenState,
} from '@/globalStates/auth';
import { accountIdState } from '@/globalStates/profileState';

type UseToken = {
  token: string;
  isTokenInitialized: boolean;
  isTokenRefreshed: boolean;
  accountId: string | null;
  setIsTokenRefreshed: (isTokenRefreshed: boolean) => void;
  setTokenAndMarkInitialized: (token: string) => void;
};

export const useToken = (): UseToken => {
  const [accountId, setAccountId] = useRecoilState(accountIdState);
  const [token, setToken] = useRecoilState(tokenState);
  const [isTokenInitialized, setIsTokenInitialized] = useRecoilState(
    isTokenInitializedState
  );
  const [isTokenRefreshed, setIsTokenRefreshed] = useRecoilState(
    isTokenRefreshedState
  );

  useEffect(() => {
    const storageToken = getAuthToken();
    setToken(storageToken || '');
    if (storageToken) {
      const currentAccountId = getAccountIdFromToken(storageToken);
      setAccountId(currentAccountId);
    }
    // setIsTokenInitializedはsetAccountIdのあとにしないとdataLayer指定より先に描画されてしまう
    setIsTokenInitialized(true);
    // 初期化のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTokenAndMarkInitialized = useCallback((token: string) => {
    setAuthToken(token);
    const currentAccountId = getAccountIdFromToken(token);
    setAccountId(currentAccountId);
    setToken(token);
    // setIsTokenInitializedはsetAccountIdのあとにしないとdataLayer指定より先に描画されてしまう
    setIsTokenInitialized(true);
    // setのみのため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    token,
    isTokenInitialized,
    isTokenRefreshed,
    accountId,
    setIsTokenRefreshed,
    setTokenAndMarkInitialized,
  };
};
