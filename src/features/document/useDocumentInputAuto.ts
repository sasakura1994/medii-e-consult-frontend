import { useState, useEffect, useCallback } from 'react';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useEraConverter } from '@/hooks/useEraConverter';
import { useProfile } from '@/hooks/useProfile';
import { DocumentSelected } from '.';

type UseDocumentInputAutoProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

export const useDocumentInputAuto = ({ setSelectedWithRedirect }: UseDocumentInputAutoProps) => {
  const { profile, getPrefectureNameByCode, hospital } = useProfile();
  const [tel, setTel] = useState('');
  const [year, setYear] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { uploadDocument } = useUploadDocument();
  const eraConverter = useEraConverter();

  useEffect(() => {
    if (profile) {
      if (profile.doctor_qualified_year !== 9999) {
        setYear(profile.doctor_qualified_year);
      }
      setTel(profile.tel);
    }
  }, [profile, setTel]);

  const submit = useCallback(async () => {
    if (profile) {
      const newProfile = { ...profile };
      newProfile.doctor_qualified_year = year;
      newProfile.confimation_type = 'auto';
      newProfile.tel = tel;
      try {
        await uploadDocument(newProfile);
        setSelectedWithRedirect('completed');
      } catch (e) {
        const error = e as { message: string };
        setErrorMessage(error.message);
      }
    }
  }, [profile, year, tel, uploadDocument, setSelectedWithRedirect]);

  return {
    profile,
    eraConverter,
    errorMessage,
    submit,
    getPrefectureNameByCode,
    hospital,
    tel,
    setTel,
    setYear,
    year,
  };
};
