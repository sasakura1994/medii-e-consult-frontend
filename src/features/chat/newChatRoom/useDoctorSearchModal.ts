import {
  SearchDoctorConditions,
  useSearchDoctor,
} from '@/hooks/api/doctor/useSearchDoctor';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import React from 'react';

export const useDoctorSearchModal = () => {
  const [experienceYears, setExperienceYears] = React.useState('');
  const [specialityCode, setSpecialityCode] = React.useState('');
  const [searchConditions, setSearchConditions] =
    React.useState<SearchDoctorConditions>();

  const { doctors } = useSearchDoctor(searchConditions);
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const applySearchConditions = React.useCallback(() => {
    setSearchConditions({
      speciality: specialityCode,
      experienceYears: experienceYears,
    });
  }, [experienceYears, specialityCode]);

  const getMedicalSpecialityName = React.useCallback(
    (specialityCode: string) =>
      medicalSpecialities?.find(
        (medicalSpeciality) =>
          medicalSpeciality.speciality_code === specialityCode
      )?.name || '',
    [medicalSpecialities]
  );

  return {
    applySearchConditions,
    doctors,
    experienceYears,
    getMedicalSpecialityName,
    medicalSpecialities,
    setSpecialityCode,
    setExperienceYears,
    specialityCode,
  };
};
