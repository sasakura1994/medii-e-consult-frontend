import useSWR, { Key } from 'swr';
import { useToken } from '@/hooks/authentication/useToken';

export const useAuthenticatedSWR = <T>(key: Key) => {
  const { token } = useToken();
  return useSWR<T>(token ? key : null);
};
