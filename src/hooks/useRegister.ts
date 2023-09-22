import React, { useCallback } from 'react';
import { useAxios } from './network/useAxios';
import { useRouter } from 'next/router';
import { loginRedirectUrlKey } from '@/data/localStorage';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users';

type Query = {
  redirect?: string;
  p?: string;
};

export type UseRegisterType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  goToSnsLogin: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsPrivacyPolicyAgree: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTermsAgree: React.Dispatch<React.SetStateAction<boolean>>;
  register: () => void;
  isSent: boolean;
};

export const useRegister = (): UseRegisterType => {
  const router = useRouter();
  const query = router.query as Query;
  const { redirect } = query;
  const { axios } = useAxios();
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isPrivacyPolicyAgree, setIsPrivacyPolicyAgree] = React.useState(false);
  const [isTermsAgree, setIsTermsAgree] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

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
    const res = await axios
      .post(dummyUrl, {
        mail_address: email,
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message);
        return null;
      });

    if (!res) {
      return;
    }

    setIsSent(true);
    saveRedirect();
  }, [axios, email, isPrivacyPolicyAgree, isTermsAgree, saveRedirect]);

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

    router.push(`/snsregistration?p=${query.p ?? ''}`);
  }, [isPrivacyPolicyAgree, isTermsAgree, query.p, router, saveRedirect]);

  return {
    email,
    setEmail,
    errorMessage,
    goToSnsLogin,
    setErrorMessage,
    register,
    setIsPrivacyPolicyAgree,
    setIsTermsAgree,
    isSent,
  };
};
