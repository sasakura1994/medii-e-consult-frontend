import { usePostHufUser } from '@/hooks/api/account/usePostHufUser';
import { usePostSetPassword } from '@/hooks/api/account/usePostSetPassword';
import { usePasswordInput } from '@/hooks/form/usePasswordInput';
import { setAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

type Query = {
  token?: string;
  huf_token?: string;
};

export const useInitPassword = () => {
  const router = useRouter();
  const query = router.query as Query;
  const passwordInput = usePasswordInput();
  const [isEmailDuplicated, setIsEmailDuplicated] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setPassword } = usePostSetPassword();
  const { createHufUser } = usePostHufUser();
  const isTokenExists = React.useMemo(
    () =>
      (query.token !== undefined && query.token !== '') || (query.huf_token !== undefined && query.huf_token !== ''),
    [query.token, query.huf_token]
  );

  const isValid = isTokenExists && passwordInput.firstPassword && !passwordInput.isPasswordNotMatched;

  const request = useCallback(() => {
    if (query.huf_token) {
      return createHufUser({
        first_password: passwordInput.firstPassword,
        second_password: passwordInput.secondPassword,
        huf_token: query.huf_token || '',
      });
    }

    return setPassword({
      first_password: passwordInput.firstPassword,
      second_password: passwordInput.secondPassword,
      token: query.token || '',
    });
  }, [
    createHufUser,
    passwordInput.firstPassword,
    passwordInput.secondPassword,
    query.huf_token,
    query.token,
    setPassword,
  ]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSending(true);
      setErrorMessage('');

      const response = await request().catch((e) => {
        const error = e as { message: string; response: { data: { message: string } } };
        setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
        return null;
      });

      setIsSending(false);

      if (!response) {
        return;
      }

      if (response.data.message === 'すでに有効化されているアカウントです') {
        setIsEmailDuplicated(true);
        return;
      }

      setAuthToken(response.data.jwt_token);
      // @todo Vueの時はヘッダと一緒にプロフィールが読み込まれるがこちらではここでglobalStateにセットする
      router.push('/EditProfile?registerMode=true');
    },
    [request, router]
  );

  return {
    ...passwordInput,
    errorMessage,
    isEmailDuplicated,
    isSending,
    isTokenExists,
    isValid,
    onSubmit,
  };
};
