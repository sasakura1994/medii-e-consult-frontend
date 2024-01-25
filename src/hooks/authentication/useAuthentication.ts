import { removeAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const useAuthentication = () => {
  const router = useRouter();

  const signOut = useCallback(() => {
    mutate(() => true, undefined, { revalidate: false });
    removeAuthToken();
    router.push('/login');
  }, [router]);

  return { signOut };
};
