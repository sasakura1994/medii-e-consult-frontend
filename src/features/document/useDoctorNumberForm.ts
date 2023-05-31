import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { Era, useEraConverter } from '@/hooks/useEraConverter';
import { useProfile } from '@/hooks/useProfile';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { DocumentSelected } from '.';

type UseDoctorNumberFormProps = {
  setSelected: React.Dispatch<React.SetStateAction<DocumentSelected>>;
};

type UseDoctorNumberForm = {
  doctorNumber: string;
  setDoctorNumber: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  isUpdatePrepared: boolean;
  submit: () => Promise<void>;
  validation: {
    min: number;
    max: number;
  };
  handleEraChange: (value: string) => void;
  inputYear: string;
  doctorLicenseMonth: string;
  setDoctorLicenseMonth: React.Dispatch<React.SetStateAction<string>>;
  doctorLicenseDay: string;
  setDoctorLicenseDay: React.Dispatch<React.SetStateAction<string>>;
  handleInputYearToSeireki: (value: string) => void;
  handleDoctorLicenseYearToJapaneseEraYear: (currentEra: Era) => void;
};

export const useDoctorNumberForm = ({
  setSelected,
}: UseDoctorNumberFormProps): UseDoctorNumberForm => {
  const { profile } = useProfile();

  const { uploadDocument } = useUploadDocument();
  const [errorMessage, setErrorMessage] = useState('');
  const [doctorNumber, setDoctorNumber] = useState('');
  const [doctorLicenseYear, setDoctorLicenseYear] = useState('');
  const [doctorLicenseMonth, setDoctorLicenseMonth] = useState('');
  const [doctorLicenseDay, setDoctorLicenseDay] = useState('');
  const {
    inputYear,
    convertYear,
    era,
    setInputYear,
    validation,
    handleEraChange,
  } = useEraConverter();
  const isUpdatePrepared = useMemo(() => {
    if (
      doctorNumber &&
      doctorLicenseYear &&
      doctorLicenseMonth &&
      doctorLicenseDay
    ) {
      return true;
    }
    return false;
  }, [doctorNumber, doctorLicenseYear, doctorLicenseMonth, doctorLicenseDay]);

  const handleInputYearToSeireki = useCallback(
    (value: string) => {
      setInputYear(value);
      const year = convertYear(value, era, 'year');
      setDoctorLicenseYear(year.toString());
    },
    [convertYear, era, setInputYear]
  );

  const handleDoctorLicenseYearToJapaneseEraYear = useCallback(
    (currentEra: Era) => {
      const newYear = convertYear(doctorLicenseYear, 'year', currentEra);

      setInputYear(newYear);
    },
    [convertYear, doctorLicenseYear, setInputYear]
  );

  const submit = async () => {
    if (profile) {
      const year = convertYear(inputYear, era, 'year');
      const newProfile = { ...profile };
      newProfile.doctor_number = doctorNumber;
      newProfile.doctor_qualified_year = Number(year);
      newProfile.doctor_qualified_month = Number(doctorLicenseMonth);
      newProfile.doctor_qualified_day = Number(doctorLicenseDay);
      newProfile.confimation_type = 'number';
      await uploadDocument(newProfile).catch((e) => {
        setErrorMessage(e.message);
      });
      setSelected('completed');
    }
  };

  useEffect(() => {
    if (profile) {
      setDoctorNumber(profile.doctor_number);
      if (profile.doctor_qualified_year !== 9999) {
        setDoctorLicenseYear(profile.doctor_qualified_year.toString());
        setInputYear(profile.doctor_qualified_year.toString());
        setDoctorLicenseMonth(profile.doctor_qualified_month.toString());
        setDoctorLicenseDay(profile.doctor_qualified_day.toString());
      }
    }
  }, [profile, setInputYear]);

  return {
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    submit,
    validation,
    handleEraChange,
    inputYear,
    doctorLicenseMonth,
    setDoctorLicenseMonth,
    doctorLicenseDay,
    setDoctorLicenseDay,
    handleInputYearToSeireki,
    handleDoctorLicenseYearToJapaneseEraYear,
  };
};
