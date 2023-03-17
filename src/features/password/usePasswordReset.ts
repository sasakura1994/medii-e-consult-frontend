import { useRouter } from 'next/router';
import React from 'react';

type Query = {
  token?: string;
};

export const usePasswordReset = () => {
  const router = useRouter();
  const query = router.query as Query;
  const [firstPassword, setFirstPassword] = React.useState('');
  const [secondPassword, setSecondPassword] = React.useState('');
  const isTokenExists = React.useMemo(
    () => query.token !== undefined,
    [query.token]
  );

  return {
    firstPassword,
    isTokenExists,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  };
};
