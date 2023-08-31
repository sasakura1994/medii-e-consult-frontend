import { usePostResetPassword } from '@/hooks/api/account/usePostPasswordReset';
import { usePasswordInput } from '@/hooks/form/usePasswordInput';
import { useRouter } from 'next/router';
import React from 'react';

type Query = {
  token?: string;
};

export const usePasswordReset = () => {
  const router = useRouter();
  const query = router.query as Query;
  const passwordInput = usePasswordInput();
  const { resetPassword } = usePostResetPassword();
  const [isSending, setIsSending] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const isTokenExists = React.useMemo(() => query.token !== undefined, [query.token]);

  const onSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      let errorMessage = '';
      e.preventDefault();
      setIsSending(true);
      setErrorMessage('');

      const response = await resetPassword({
        first_password: passwordInput.firstPassword,
        second_password: passwordInput.secondPassword,
        token: query.token || '',
      }).catch((error) => {
        console.error(error);
        errorMessage = error.response.data.message ?? 'エラーが発生しました';
        setErrorMessage(errorMessage);
        return error.response;
      });

      setIsSending(false);

      if (!response) return;

      if (response.status !== 204 && !errorMessage) {
        setErrorMessage(response.data.message ?? 'エラーが発生しました');
        return;
      }

      setIsCompleted(true);
    },
    [passwordInput.firstPassword, passwordInput.secondPassword, query.token, resetPassword]
  );

  return {
    ...passwordInput,
    errorMessage,
    isCompleted,
    isSending,
    isTokenExists,
    onSubmit,
  };
};
