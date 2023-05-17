import React from 'react';
import { usePostRequestResetPassword } from '@/hooks/api/account/usePostRequestResetPassword';

export const usePasswordResetRequest = () => {
  const [mailAddress, setMailAddress] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { requestResetPassword } = usePostRequestResetPassword();

  const sendPasswordResetRequest = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSending(true);
      setErrorMessage('');

      const response = await requestResetPassword(mailAddress).catch(
        (error) => {
          console.error(error);
          return null;
        }
      );

      setIsSending(false);

      if (!response) {
        setErrorMessage('エラーが発生しました');
        return;
      }
      if (response.status !== 204) {
        const errorMessage = response.data.message ?? 'エラーが発生しました';
        setErrorMessage(errorMessage);
        return;
      }

      setIsCompleted(true);
    },
    [mailAddress, requestResetPassword]
  );

  return {
    errorMessage,
    isCompleted,
    isSending,
    mailAddress,
    sendPasswordResetRequest,
    setMailAddress,
  };
};
