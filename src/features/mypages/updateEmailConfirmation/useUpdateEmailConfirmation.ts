import React, { useState, useCallback } from 'react';
import { usePatchEditPassword } from '@/hooks/api/account/useEditEmailConfirmation';
import { useRouter } from 'next/router';

type Query = {
  token?: string;
};

export type UseEditEmailConfirmationType = {
  errorMessage: string;
  firstPassword: string;
  secondPassword: string;
  setFirstPassword: (password: string) => void;
  setSecondPassword: (password: string) => void;
  submit: () => void;
  editConfirmEmail: () => Promise<boolean>;
  emailConfirmStatus: boolean;
};

export const useUpdateEmailConfirmation = (): UseEditEmailConfirmationType => {
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailConfirmStatus, setEmailConfirmStatus] = useState(false);
  const router = useRouter();
  const { token } = router.query as Query;

  const { editPassword } = usePatchEditPassword();

  const editConfirmEmail = useCallback(async (): Promise<boolean> => {
    const formData = {
      password: firstPassword,
      token: token,
    };
    const response = await editPassword(formData).catch((error) => {
      setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
      return null;
    });

    if (!response) {
      return true;
    }

    if (response.status !== 204 && !errorMessage) {
      setErrorMessage(response.data.message ?? 'エラーが発生しました');
      return false;
    }
    return false;
  }, [firstPassword, editPassword, token, setErrorMessage, errorMessage]);

  const submit = useCallback(async () => {
    if (!token) {
      return;
    }
    setErrorMessage('');
    if (firstPassword !== secondPassword) {
      setErrorMessage('パスワードが一致していません');
      return;
    }

    const result = await editConfirmEmail();
    if (result) {
      setEmailConfirmStatus(!emailConfirmStatus);
      return;
    }
  }, [firstPassword, secondPassword, editConfirmEmail, token, emailConfirmStatus]);

  return {
    firstPassword,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
    errorMessage,
    submit,
    editConfirmEmail,
    emailConfirmStatus,
  };
};
