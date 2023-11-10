import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useSelectedFile } from './useSelectedFile';
import { DocumentSelected } from '.';
import { useEraConverter } from '@/hooks/useEraConverter';
import router from 'next/router';

type UseDocumentInputStudentDocumentProps = {
  selected: DocumentSelected;
  setSelected: Dispatch<SetStateAction<DocumentSelected>>;
};

export const useDocumentInputStudentDocument = ({ selected, setSelected }: UseDocumentInputStudentDocumentProps) => {
  const { profile } = useFetchProfile();
  const { uploadDocument } = useUploadDocument();
  const [year, setYear] = useState(0);
  const { file, imageSource, setImageSource, onFileSelected, openFileSelector, fileSelectorRef, reset } =
    useSelectedFile();
  const eraConverter = useEraConverter();

  const [errorMessage, setErrorMessage] = useState('');

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!profile) return;
      if (fileSelectorRef.current?.files?.[0]) {
        if (!imageSource) {
          return;
        }
        const newProfile = { ...profile };
        newProfile.graduation_year = year;
        newProfile.confimation_type = 'document';
        newProfile.document = fileSelectorRef.current?.files?.[0] || undefined;
        try {
          await uploadDocument(newProfile);
          setSelected('studentCompleted');
        } catch (e) {
          const error = e as { message: string; response: { data: { message: string } } };
          setErrorMessage(error.response?.data?.message);
        }
      } else {
        setErrorMessage('ファイルの種類が不正です');
      }
    },
    [profile, fileSelectorRef, imageSource, year, uploadDocument, setSelected]
  );

  useEffect(() => {
    if (profile) {
      setImageSource(profile.document_file_path);
    }
  }, [profile, setImageSource]);

  useEffect(() => {
    if (selected !== 'studentCompleted') return;
    const timeout = setTimeout(() => {
      router.push('/top');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [selected]);

  return {
    eraConverter,
    file,
    imageSource,
    onFileSelected,
    openFileSelector,
    fileSelectorRef,
    errorMessage,
    reset,
    submit,
    year,
    setYear,
  };
};
