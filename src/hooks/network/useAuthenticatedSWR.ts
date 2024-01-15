import useSWR, { Key, SWRConfiguration } from 'swr';
import { useToken } from '@/hooks/authentication/useToken';

export const useAuthenticatedSWR = <T>(key: Key, config?: SWRConfiguration) => {
  const { token } = useToken();
  return useSWR<T>(token ? key : null, null, config);
};
