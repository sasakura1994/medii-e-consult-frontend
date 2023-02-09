import React from 'react';
import { useCookies } from 'react-cookie';

type UseAccountType = {
  accountId: string;
  getAccountFromToken: () => void;
};

export const useAccount = (): UseAccountType => {
  const [cookies] = useCookies(['access_token']);
  const [accountId, setAccountId] = React.useState('');

  const getToken = (): string | undefined => {
    return cookies.access_token as string | undefined;
  };

  const getAccountFromToken = () => {
    const token = getToken();
    if (!token) return;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64').toString('utf-8')
    );

    setAccountId(JSON.parse(jsonPayload).account_id as string);
  };

  return {
    accountId,
    getAccountFromToken,
  };
};
