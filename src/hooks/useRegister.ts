import React, { useCallback, useEffect, useState } from 'react';
import { useAxios } from './network/useAxios';
import { useRouter } from 'next/router';
import { loginRedirectUrlKey } from '@/data/localStorage';
import { ParsedUrlQuery } from 'querystring';
import { toast } from 'react-toastify';

type Query = {
  redirect?: string;
  p?: string;
};

type CreateAccountRequestData = {
  mail_address: string;
  parent_account_id?: string;
  queries: ParsedUrlQuery;
};

export type UseRegisterType = {
  back: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  loginUrl: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  register: () => void;
  registerAgain: () => void;
  isEmailDuplicated: boolean;
  isSending: boolean;
  isSent: boolean;
};

export const useRegister = (): UseRegisterType => {
  const router = useRouter();
  const { redirect, p: parentAccountId } = router.query as Query;
  const { axios } = useAxios();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [queryString, setQueryString] = useState('');

  const isEmailDuplicated = errorMessage === 'すでに登録されているメールアドレスです';
  const loginUrl = `/login${queryString}`;

  useEffect(() => {
    setQueryString(location.search);
  }, []);

  const saveRedirect = useCallback(() => {
    if (!redirect) {
      return;
    }

    localStorage.setItem(loginRedirectUrlKey, redirect);
  }, [redirect]);

  const createAccount = useCallback(() => {
    const data: CreateAccountRequestData = {
      mail_address: email,
      parent_account_id: parentAccountId,
      queries: router.query,
    };

    return axios.post('/doctor/create_account', data);
  }, [axios, email, parentAccountId, router.query]);

  const register = useCallback(async () => {
    setIsSending(true);

    const res = await createAccount().catch((error) => {
      setErrorMessage(error.response?.data?.message ?? 'エラーが発生しました');
      return null;
    });

    setIsSending(false);

    if (!res) {
      return;
    }

    setIsSent(true);
    saveRedirect();
  }, [createAccount, saveRedirect]);

  const registerAgain = useCallback(async () => {
    setIsSending(true);

    const res = await createAccount().catch((error) => {
      setErrorMessage(error.response?.data?.message ?? 'エラーが発生しました');
      return null;
    });

    setIsSending(false);

    if (!res) {
      return;
    }

    toast('再送しました。');
  }, [createAccount]);

  const back = useCallback(() => {
    setEmail('');
    setIsSent(false);
  }, []);

  return {
    back,
    email,
    setEmail,
    errorMessage,
    loginUrl,
    setErrorMessage,
    register,
    registerAgain,
    isEmailDuplicated,
    isSending,
    isSent,
  };
};
