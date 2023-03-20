import React from 'react';
import { createApiClient } from '@/libs/apiClient';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users';

export type UseLoginType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsPrivacyPolicyAgree: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTermsAgree:  React.Dispatch<React.SetStateAction<boolean>>;
  register: () => void;
  isSent: boolean;
};

export const useRegister = (): UseLoginType => {
  const [email, setEmail] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState( '' );
  const [isPrivacyPolicyAgree, setIsPrivacyPolicyAgree] =
    React.useState(false );
  const [isTermsAgree, setIsTermsAgree] =
    React.useState( false );
  const [isSent, setIsSent] = React.useState(false);

  const register = async () =>
  {
    if (email === "") {
      setErrorMessage( 'メールアドレスを入力してください' );
      return
    }
    if ( !isPrivacyPolicyAgree )
    {
      setErrorMessage( '個人情報の取扱いについて確認してください' );
      return
    }
    if (!isTermsAgree) {
      setErrorMessage( '利用規約を確認してください' );
      return
    }
    try {
      const apiClient = createApiClient();
      const res = await apiClient.post(dummyUrl, {
        mail_address: email,
      });

      console.log('res', res.data);

      if (!res) {
        throw new Error('エラーが発生しました');
      }
      if (res.data.code === -1) {
        throw new Error(res.data.message);
      }
      setIsSent( true );
    } catch (e: unknown) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };
  return {
    email,
    setEmail,
    errorMessage,
    setErrorMessage,
    register,
    setIsPrivacyPolicyAgree,
    setIsTermsAgree,
    isSent,
  };
};
