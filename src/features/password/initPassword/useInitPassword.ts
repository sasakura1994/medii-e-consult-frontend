import { usePostSetPassword } from '@/hooks/api/account/usePostSetPassword';
import { usePasswordInput } from '@/hooks/form/usePasswordInput';
import { useRouter } from 'next/router';
import React from 'react';

type Query = {
  token?: string;
};

export const useInitPassword = () => {
  const router = useRouter();
  const query = router.query as Query;
  const passwordInput = usePasswordInput();
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] =
    React.useState(false);
  const [isTermsOfUseAgreed, setIsTermsOfUseAgreed] = React.useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setPassword } = usePostSetPassword();
  const isTokenExists = React.useMemo(
    () => query.token !== undefined,
    [query.token]
  );

  const onSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isPrivacyPolicyAgreed || !isTermsOfUseAgreed || !isRead) {
        setErrorMessage('チェックボックスがチェックされていません');
        return;
      }

      setIsSending(true);
      setErrorMessage('');

      const response = await setPassword({
        first_password: passwordInput.firstPassword,
        second_password: passwordInput.secondPassword,
        token: query.token || '',
      }).catch((error) => {
        console.error(error);
        return null;
      });

      setIsSending(false);

      if (!response) {
        setErrorMessage('エラーが発生しました');
        return;
      }

      if (response.data.code !== 1) {
        setErrorMessage(response.data.message);
        if (response.data.message === 'すでに有効化されているアカウントです') {
          setIsEmailDuplicated(true);
        }
        return;
      }

      localStorage.setItem('token', response.data.jwt_token);
      // @todo Vueの時はヘッダと一緒にプロフィールが読み込まれるがこちらではここでglobalStateにセットする
      router.push('/EditProfile?registerMode=true');
    },
    [
      passwordInput.firstPassword,
      passwordInput.secondPassword,
      isPrivacyPolicyAgreed,
      isTermsOfUseAgreed,
      isRead,
    ]
  );

  return {
    ...passwordInput,
    errorMessage,
    isEmailDuplicated,
    isPrivacyPolicyAgreed,
    isRead,
    isSending,
    isTermsOfUseAgreed,
    isTokenExists,
    onSubmit,
    setIsRead,
    setIsTermsOfUseAgreed,
    setIsPrivacyPolicyAgreed,
  };
};
