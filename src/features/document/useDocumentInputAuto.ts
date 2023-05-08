import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useEraConverter } from '@/hooks/useEraConverter';
import { useProfile } from '@/hooks/useProfile';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';

type UseDocumentInputAutoProps = {
  setSelected: Dispatch<
    SetStateAction<'' | 'number' | 'document' | 'auto' | 'completed'>
  >;
};

type UseDocumentInputAuto = {
  profile: ProfileEntity | undefined;
  errorMessage: string;
  submit: () => Promise<void>;
  validation: {
    min: number;
    max: number;
  };
  handleEraChange: (value: string) => void;
  getPrefectureNameByCode: (code: string | undefined) => string | undefined;
  hospital: HospitalEntity | undefined;
  tel: string;
  setTel: Dispatch<SetStateAction<string>>;
  inputYear: string;
  setInputYear: Dispatch<SetStateAction<string>>;
  doctorLicenseYear: string;
};

export const useDocumentInputAuto = ({
  setSelected,
}: UseDocumentInputAutoProps): UseDocumentInputAuto => {
  const { profile, getPrefectureNameByCode, hospital } = useProfile();
  const [tel, setTel] = useState('');
  const [doctorLicenseYear, setDoctorLicenseYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { uploadDocument } = useUploadDocument();
  const {
    inputYear,
    convertYear,
    era,
    setInputYear,
    validation,
    handleEraChange,
  } = useEraConverter();

  useEffect(() => {
    if (profile) {
      setInputYear(profile.doctor_qualified_year.toString());
      setTel(profile.tel);
    }
  }, [profile, setInputYear]);

  useEffect(() => {
    if (inputYear) {
      const year = convertYear(inputYear, era, 'year');
      setDoctorLicenseYear(year.toString());
    }
  }, [convertYear, era, inputYear]);

  useEffect(() => {
    if (doctorLicenseYear) {
      const newYear = convertYear(doctorLicenseYear, 'year', era);
      setInputYear(newYear);
    }
  }, [convertYear, doctorLicenseYear, era, setInputYear]);

  const submit = useCallback(async () => {
    if (profile) {
      const year = convertYear(inputYear, era, 'year');
      const newProfile = Object.assign({}, profile);
      newProfile.doctor_qualified_year = Number(year);
      newProfile.confimation_type = 'auto';
      newProfile.tel = tel;
      await uploadDocument(newProfile).catch((e) => {
        setErrorMessage(e.message);
      });
      setSelected('completed');
    }
  }, [profile, convertYear, inputYear, era, tel, uploadDocument, setSelected]);

  return {
    profile,
    errorMessage,
    submit,
    validation,
    handleEraChange,
    getPrefectureNameByCode,
    hospital,
    tel,
    setTel,
    inputYear,
    setInputYear,
    doctorLicenseYear,
  };
};
