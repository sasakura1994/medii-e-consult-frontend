import { useState, useEffect, useCallback } from 'react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useSelectedFile } from './useSelectedFile';
import { DocumentSelected } from '.';

type UseDocumentInputDocumentProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

type UseDocumentInputDocument = {
  imageSource: string;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileSelector: () => void;
  fileSelectorRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  submit: (e: React.FormEvent) => void;
};

export const useDocumentInputDocument = ({
  setSelectedWithRedirect,
}: UseDocumentInputDocumentProps): UseDocumentInputDocument => {
  const { profile } = useFetchProfile();
  const { uploadDocument } = useUploadDocument();
  const { imageSource, onFileSelected, setImageSource, openFileSelector, fileSelectorRef } = useSelectedFile();

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
        newProfile.document = fileSelectorRef.current?.files?.[0] || undefined;
        newProfile.confimation_type = 'document';
        try {
          await uploadDocument(newProfile);
          setSelectedWithRedirect('completed');
        } catch (e) {
          const error = e as { message: string; response: { data: { message: string } } };
          setErrorMessage(error.response.data.message);
        }
      } else {
        setErrorMessage('ファイルの種類が不正です');
      }
    },
    [profile, imageSource, fileSelectorRef, uploadDocument, setSelectedWithRedirect]
  );

  useEffect(() => {
    if (profile) {
      setImageSource(profile.document_file_path);
    }
  }, [profile, setImageSource]);

  return {
    imageSource,
    onFileSelected,
    openFileSelector,
    fileSelectorRef,
    errorMessage,
    submit,
  };
};
