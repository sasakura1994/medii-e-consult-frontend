import { usePasswordInput } from '@/hooks/form/usePasswordInput';
import { useRouter } from 'next/router';
import React from 'react';

type Query = {
  token?: string;
};

export const useInitPassword = () => {
  const router = useRouter();
  const query = router.query as Query;
  const passwordInput = usePasswordInput();
  const isTokenExists = React.useMemo(
    () => query.token !== undefined,
    [query.token]
  );

  return {
    ...passwordInput,
    isTokenExists,
  };
};
