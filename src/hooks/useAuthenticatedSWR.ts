import useSWR from 'swr';
import { useToken } from '@/hooks/useToken';

export const useAuthenticatedSWR = <T>(key: string) => {
  const token = useToken('token');
  return useSWR<T>(token ? key : null);
};
