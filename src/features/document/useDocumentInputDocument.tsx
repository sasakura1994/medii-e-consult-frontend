import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useSelectedFile } from './useSelectedFile';
import { DocumentSelected } from '.';

type UseDocumentInputDocumentProps = {
  setSelected: Dispatch<SetStateAction<DocumentSelected>>;
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
  setSelected,
}: UseDocumentInputDocumentProps): UseDocumentInputDocument => {
  const { profile } = useFetchProfile();
  const { uploadDocument } = useUploadDocument();
  const {
    imageSource,
    onFileSelected,
    setImageSource,
    openFileSelector,
    fileSelectorRef,
  } = useSelectedFile();

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
        try {
          await uploadDocument(newProfile);
          setSelected('completed');
        } catch (e) {
          const error = e as { message: string };
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('ファイルの種類が不正です');
      }
    },
    [profile, imageSource, fileSelectorRef, uploadDocument, setSelected]
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
