import React, { useCallback, useEffect, useState } from 'react';
import { useAxios } from './network/useAxios';
import { useRouter } from 'next/router';
import { loginRedirectUrlKey } from '@/data/localStorage';
import { ParsedUrlQuery } from 'querystring';

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
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  loginUrl: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  register: () => void;
  isEmailDuplicated: boolean;
  isSent: boolean;
};

export const useRegister = (): UseRegisterType => {
  const router = useRouter();
  const { redirect, p: parentAccountId } = router.query as Query;
  const { axios } = useAxios();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  const register = useCallback(async () => {
    const data: CreateAccountRequestData = {
      mail_address: email,
      parent_account_id: parentAccountId,
      queries: router.query,
    };

    const res = await axios.post('/doctor/create_account', data).catch((error) => {
      setErrorMessage(error.response?.data?.message ?? 'エラーが発生しました');
      return null;
    });

    if (!res) {
      return;
    }

    setIsSent(true);
    saveRedirect();
  }, [axios, email, parentAccountId, router.query, saveRedirect]);

  return {
    email,
    setEmail,
    errorMessage,
    loginUrl,
    setErrorMessage,
    register,
    isEmailDuplicated,
    isSent,
  };
};
