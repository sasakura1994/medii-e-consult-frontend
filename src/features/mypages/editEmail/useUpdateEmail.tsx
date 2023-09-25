import { emailSubmitState } from '@/globalStates/editSubmitState';
import { useEditEmail } from '@/hooks/api/account/useEditEmail';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

export type UseEditEmail = {
  errorMessage: string;
  email: string;
  setEmail: (email: string) => void;
  submit: () => void;
  saveEditEmail: () => Promise<boolean>;
  editEmailStatus: boolean;
};

export const useUpdateEmail = (): UseEditEmail => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const [editEmailStatus, setEditEmailStatus] = useRecoilState(emailSubmitState);

  const { editEmail } = useEditEmail();

  const saveEditEmail = useCallback(async (): Promise<boolean> => {
    const formData = new FormData();
    formData.append('mail_address', email);

    //  this is the part for sending mail api
    const response = await editEmail(formData).catch((error) => {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
      return null;
    });

    if (!response) {
      return false;
    }
    return true;
    // the end of part
  }, [email, editEmail]);

  const submit = useCallback(async () => {
    if (!email) {
      return;
    }

    const result = await saveEditEmail();
    if (!result) {
      return;
    }

    setEditEmailStatus(true);
  }, [email, saveEditEmail]);
  return {
    errorMessage,
    email,
    setEmail,
    submit,
    saveEditEmail,
    editEmailStatus,
  };
};
