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
  queryString: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  goToSnsLogin: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsPrivacyPolicyAgree: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTermsAgree: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isPrivacyPolicyAgree, setIsPrivacyPolicyAgree] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [queryString, setQueryString] = useState('');

  const isEmailDuplicated = errorMessage === 'すでに登録されているメールアドレスです';

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
    if (email === '') {
      setErrorMessage('メールアドレスを入力してください');
      return;
    }
    if (!isPrivacyPolicyAgree) {
      setErrorMessage('個人情報の取扱いについて確認してください');
      return;
    }
    if (!isTermsAgree) {
      setErrorMessage('利用規約を確認してください');
      return;
    }

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
  }, [axios, email, isPrivacyPolicyAgree, isTermsAgree, parentAccountId, router.query, saveRedirect]);

  const goToSnsLogin = useCallback(() => {
    if (!isPrivacyPolicyAgree) {
      setErrorMessage('個人情報の取扱いについて確認してください');
      return;
    }
    if (!isTermsAgree) {
      setErrorMessage('利用規約を確認してください');
      return;
    }

    saveRedirect();

    router.push(`/snsregistration?p=${parentAccountId ?? ''}`);
  }, [isPrivacyPolicyAgree, isTermsAgree, parentAccountId, router, saveRedirect]);

  return {
    email,
    queryString,
    setEmail,
    errorMessage,
    goToSnsLogin,
    setErrorMessage,
    register,
    setIsPrivacyPolicyAgree,
    setIsTermsAgree,
    isEmailDuplicated,
    isSent,
  };
};
