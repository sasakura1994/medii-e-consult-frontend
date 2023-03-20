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

      if (response.data.code !== 1) {
        setErrorMessage(response.data.message);
        return;
      }

      setIsCompleted(true);
    },
    [mailAddress]
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
