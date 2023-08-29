import { usePostSetPassword } from '@/hooks/api/account/usePostSetPassword';
import { usePasswordInput } from '@/hooks/form/usePasswordInput';
import { setAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';
import React from 'react';

type Query = {
  token?: string;
};

export const useInitPassword = () => {
  const router = useRouter();
  const query = router.query as Query;
  const passwordInput = usePasswordInput();
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = React.useState(false);
  const [isTermsOfUseAgreed, setIsTermsOfUseAgreed] = React.useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = React.useState(false);
  const [isRead, setIsRead] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setPassword } = usePostSetPassword();
  const isTokenExists = React.useMemo(() => query.token !== undefined, [query.token]);

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
      }).catch((e) => {
        const error = e as { message: string };
        setErrorMessage(error.message || 'エラーが発生しました');
        return null;
      });

      setIsSending(false);

      if (!response) {
        return;
      }

      if (response.data.message === 'すでに有効化されているアカウントです') {
        setIsEmailDuplicated(true);
        return;
      }

      setAuthToken(response.data.jwt_token);
      // @todo Vueの時はヘッダと一緒にプロフィールが読み込まれるがこちらではここでglobalStateにセットする
      router.push('/EditProfile?registerMode=true');
    },
    [
      isPrivacyPolicyAgreed,
      isTermsOfUseAgreed,
      isRead,
      setPassword,
      passwordInput.firstPassword,
      passwordInput.secondPassword,
      query.token,
      router,
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
