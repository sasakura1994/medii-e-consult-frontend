import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useFetchProfile } from '../api/doctor/useFetchProfile';

export const useGuest = () => {
  const router = useRouter();
  const { profile } = useFetchProfile();

  const checkGuestAccess = useCallback(
    (url: string) => {
      if (profile?.is_guest !== true) {
        return;
      }

      const match = url.match(/^https?:\/\/([^/]+)/);
      if (match) {
        const hostname = match[1];
        if (hostname !== location.hostname) {
          return;
        }
      }

      const pathname = url.replace(/^https?:\/\/[-/]+/, '').replace(/\?.+/, '');
      if (!['/', '/top'].includes(pathname.toLowerCase())) {
        router.push(`/guest?redirect=${encodeURIComponent(pathname)}`);
      }
    },
    [profile?.is_guest, router]
  );

  useEffect(() => {
    checkGuestAccess(router.pathname);
  }, [checkGuestAccess, router.pathname]);
};
