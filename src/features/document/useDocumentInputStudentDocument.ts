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
import { Era, useEraConverter } from '@/hooks/useEraConverter';

type UseDocumentInputStudentDocumentProps = {
  setSelected: Dispatch<SetStateAction<DocumentSelected>>;
};

type UseDocumentInputStudentDocument = {
  imageSource: string;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileSelector: () => void;
  fileSelectorRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  submit: (e: React.FormEvent) => void;
  validation: {
    min: number;
    max: number;
  };
  handleEraChange: (value: string) => void;
  inputYear: string;
  handleInputYearToSeireki: (value: string) => void;
  handleGraduationYearToJapaneseEraYear: (currentEra: Era) => void;
};

export const useDocumentInputStudentDocument = ({
  setSelected,
}: UseDocumentInputStudentDocumentProps): UseDocumentInputStudentDocument => {
  const { profile } = useFetchProfile();
  const { uploadDocument } = useUploadDocument();
  const [graduationYear, setGraduationYear] = useState('');
  const {
    imageSource,
    onFileSelected,
    setImageSource,
    openFileSelector,
    fileSelectorRef,
  } = useSelectedFile();
  const {
    inputYear,
    convertYear,
    era,
    setInputYear,
    validation,
    handleEraChange,
  } = useEraConverter();

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputYearToSeireki = useCallback(
    (value: string) => {
      setInputYear(value);
      const year = convertYear(value, era, 'year');
      setGraduationYear(year.toString());
    },
    [convertYear, era, setInputYear]
  );

  const handleGraduationYearToJapaneseEraYear = useCallback(
    (currentEra: Era) => {
      const newYear = convertYear(graduationYear, 'year', currentEra);

      setInputYear(newYear);
    },
    [convertYear, graduationYear, setInputYear]
  );

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!profile) return;
      if (fileSelectorRef.current?.files?.[0]) {
        if (!imageSource) {
          return;
        }
        const year = convertYear(inputYear, era, 'year');
        const newProfile = { ...profile };
        newProfile.graduation_year = Number(year);
        newProfile.confimation_type = 'document';
        newProfile.document = fileSelectorRef.current?.files?.[0] || undefined;
        await uploadDocument(newProfile).catch((e) => {
          setErrorMessage(e.message);
        });
        setSelected('studentCompleted');
      } else {
        setErrorMessage('ファイルの種類が不正です');
      }
    },
    [
      profile,
      fileSelectorRef,
      imageSource,
      convertYear,
      inputYear,
      era,
      uploadDocument,
      setSelected,
    ]
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
    validation,
    handleEraChange,
    inputYear,
    handleInputYearToSeireki,
    handleGraduationYearToJapaneseEraYear,
  };
};
