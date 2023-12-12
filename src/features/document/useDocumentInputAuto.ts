import { useState, useCallback } from 'react';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useProfile } from '@/hooks/useProfile';
import { DocumentSelected } from '.';

type UseDocumentInputAutoProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

export const useDocumentInputAuto = ({ setSelectedWithRedirect }: UseDocumentInputAutoProps) => {
  const { profile, getPrefectureNameByCode, hospital } = useProfile();
  const [errorMessage, setErrorMessage] = useState('');
  const { uploadDocument } = useUploadDocument();

  const submit = useCallback(async () => {
    if (profile) {
      const newProfile = { ...profile };
      newProfile.confimation_type = 'auto';
      try {
        await uploadDocument(newProfile);
        setSelectedWithRedirect('completed');
      } catch (e) {
        const error = e as { message: string; response: { data: { message: string } } };
        setErrorMessage(error.response?.data?.message);
      }
    }
  }, [profile, uploadDocument, setSelectedWithRedirect]);

  return {
    profile,
    errorMessage,
    submit,
    getPrefectureNameByCode,
    hospital,
  };
};
