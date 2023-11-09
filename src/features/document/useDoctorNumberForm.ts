import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useProfile } from '@/hooks/useProfile';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { DocumentSelected } from '.';

type UseDoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

export const useDoctorNumberForm = ({ setSelectedWithRedirect }: UseDoctorNumberFormProps) => {
  const { profile } = useProfile();

  const { uploadDocument } = useUploadDocument();
  const [errorMessage, setErrorMessage] = useState('');
  const [doctorNumber, setDoctorNumber] = useState('');
  const [year, setYear] = useState(0);
  const [doctorLicenseDate, setDoctorLicenseDate] = useState<Date>();
  const isUpdatePrepared = useMemo(() => {
    if (doctorNumber && doctorLicenseDate) {
      return true;
    }
    return false;
  }, [doctorNumber, doctorLicenseDate]);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    if (profile && doctorLicenseDate) {
      const newProfile = { ...profile };
      newProfile.doctor_number = doctorNumber;
      newProfile.doctor_qualified_year = doctorLicenseDate.getFullYear();
      newProfile.doctor_qualified_month = doctorLicenseDate.getMonth() + 1;
      newProfile.doctor_qualified_day = doctorLicenseDate.getDate();
      newProfile.confimation_type = 'number';
      try {
        await uploadDocument(newProfile);
        setSelectedWithRedirect('completed');
      } catch (e) {
        const error = e as { message: string; response: { data: { message: string } } };
        setErrorMessage(error.response?.data?.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (profile) {
      setDoctorNumber(profile.doctor_number);
      if (profile.doctor_qualified_year !== 9999) {
        setDoctorLicenseDate(
          new Date(profile.doctor_qualified_year, profile.doctor_qualified_month - 1, profile.doctor_qualified_day)
        );
      }
    }
  }, [profile]);

  const parseAndSetDoctorLicenseDate = useCallback((date: string) => {
    const parts = date.split(/-/);
    setDoctorLicenseDate(new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
  }, []);

  return {
    dateInputRef,
    doctorLicenseDate,
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    parseAndSetDoctorLicenseDate,
    submit,
    setDoctorLicenseDate,
    year,
    setYear,
  };
};
