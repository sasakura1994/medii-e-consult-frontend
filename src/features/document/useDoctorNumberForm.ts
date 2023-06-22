import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useEraConverter } from '@/hooks/useEraConverter';
import { useProfile } from '@/hooks/useProfile';
import { useState, useEffect, useMemo } from 'react';
import { DocumentSelected } from '.';

type UseDoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

export const useDoctorNumberForm = ({ setSelectedWithRedirect }: UseDoctorNumberFormProps) => {
  const { profile } = useProfile();

  const { uploadDocument } = useUploadDocument();
  const [errorMessage, setErrorMessage] = useState('');
  const [doctorNumber, setDoctorNumber] = useState('');
  const [doctorLicenseYear, setDoctorLicenseYear] = useState('');
  const [doctorLicenseMonth, setDoctorLicenseMonth] = useState('');
  const [doctorLicenseDay, setDoctorLicenseDay] = useState('');
  const [year, setYear] = useState(0);
  const eraConverter = useEraConverter();
  const isUpdatePrepared = useMemo(() => {
    if (doctorNumber && doctorLicenseYear && doctorLicenseMonth && doctorLicenseDay) {
      return true;
    }
    return false;
  }, [doctorNumber, doctorLicenseYear, doctorLicenseMonth, doctorLicenseDay]);

  const submit = async () => {
    if (profile) {
      const newProfile = { ...profile };
      newProfile.doctor_number = doctorNumber;
      newProfile.doctor_qualified_year = year;
      newProfile.doctor_qualified_month = Number(doctorLicenseMonth);
      newProfile.doctor_qualified_day = Number(doctorLicenseDay);
      newProfile.confimation_type = 'number';
      try {
        await uploadDocument(newProfile);
        setSelectedWithRedirect('completed');
      } catch (e) {
        const error = e as { message: string };
        setErrorMessage(error.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (profile) {
      setDoctorNumber(profile.doctor_number);
      if (profile.doctor_qualified_year !== 9999) {
        setDoctorLicenseYear(profile.doctor_qualified_year.toString());
        setYear(profile.doctor_qualified_year);
        setDoctorLicenseMonth(profile.doctor_qualified_month.toString());
        setDoctorLicenseDay(profile.doctor_qualified_day.toString());
      }
    }
  }, [profile]);

  return {
    eraConverter,
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    submit,
    doctorLicenseYear,
    doctorLicenseMonth,
    setDoctorLicenseMonth,
    doctorLicenseDay,
    setDoctorLicenseDay,
    year,
    setYear,
  };
};
