import { useState, useCallback, useEffect } from 'react';
import { usePatchEditPassword } from '@/hooks/api/account/useEditEmailConfirmation';
import { useRouter } from 'next/router';
import { useGetIsTokenExists } from '@/hooks/api/account/useIsTokenExists';

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
  isTokenExist: boolean | null;
  isSending: boolean;
};

export const useUpdateEmailConfirmation = (): UseEditEmailConfirmationType => {
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailConfirmStatus, setEmailConfirmStatus] = useState(true);
  const [isTokenExist, setIsTokenExist] = useState<boolean | null>(null);
  const [isSending, setIsSending] = useState(true);
  const router = useRouter();
  const { token } = router.query as Query;

  const { editPassword } = usePatchEditPassword();
  const { isTokenExists } = useGetIsTokenExists();

  useEffect(() => {
    const fetchIstoken = async () => {
      const data = {
        token,
      };
      const response = await isTokenExists(data).catch((error) => {
        console.error(error);
        return null;
      });

      if (!response) {
        return false;
      }

      setIsTokenExist(response && response.data.has_email_updating);
      setIsSending(false);
    };

    fetchIstoken();
  }, [token, isTokenExists]);

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
      return false;
    }

    return true;
  }, [firstPassword, editPassword, token, setErrorMessage]);

  const submit = useCallback(async () => {
    setErrorMessage('');
    if (!token) {
      return;
    }

    if (firstPassword !== secondPassword) {
      setErrorMessage('パスワードが一致していません');
      return;
    }

    const result = await editConfirmEmail();
    if (result) {
      setEmailConfirmStatus(false);
      return;
    }
  }, [firstPassword, secondPassword, editConfirmEmail, token, setErrorMessage, setEmailConfirmStatus]);

  return {
    firstPassword,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
    errorMessage,
    submit,
    editConfirmEmail,
    emailConfirmStatus,
    isTokenExist,
    isSending,
  };
};
