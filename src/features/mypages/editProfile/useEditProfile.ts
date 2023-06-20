import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type EditingProfile = Omit<
  ProfileEntity,
  'birthday_year' | 'birthday_month' | 'birthday_day' | 'qualified_year'
> & {
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
  qualified_year: string;
};

type Option = {
  value: string;
  label: string;
};

const numberToString = (value: number) => (value === 0 ? '' : value.toString());

export const useEditProfile = () => {
  const [profile, setProfile] = useState<EditingProfile>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hospitalInputType, setHospitalInputType] = useState<'free' | 'select'>('select');
  const [hospitalSearchText, setHospitalSearchText] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Option>();

  const { profile: fetchedProfile } = useFetchProfile();
  const { hospital: defaultHospital } = useFetchHospital(isInitialized ? fetchedProfile?.hospital_id : undefined);
  const { hospitals } = useSearchHospitals(profile?.prefecture_code, hospitalSearchText);

  const hospitalOptions = useMemo<Option[]>(
    () => hospitals?.map((h) => ({ label: h.hospital_name, value: h.hospital_id })),
    [hospitals]
  );

  useEffect(() => {
    if (!defaultHospital) {
      return;
    }
    setSelectedHospital({
      value: defaultHospital.hospital_id,
      label: defaultHospital.hospital_name,
    });
  }, [defaultHospital]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (!fetchedProfile) {
      return;
    }

    setProfile({
      ...fetchedProfile,
      birthday_year: numberToString(fetchedProfile.birthday_year),
      birthday_month: numberToString(fetchedProfile.birthday_month),
      birthday_day: numberToString(fetchedProfile.birthday_day),
      qualified_year: numberToString(fetchedProfile.qualified_year),
    });
    setHospitalInputType(fetchedProfile.hospital_id === '' && fetchedProfile.hospital_name !== '' ? 'free' : 'select');
    setIsInitialized(true);
  }, [fetchedProfile, isInitialized]);

  const setHospitalName = useCallback(
    (hospitalName: string) => {
      if (!profile) {
        return;
      }
      setProfile({ ...profile, hospital_name: hospitalName });
      setHospitalInputType('free');
    },
    [profile]
  );

  const selectHospital = useCallback(
    (selected: Option | null) => {
      if (!profile) {
        return;
      }
      setProfile({ ...profile, hospital_id: selected?.value ?? '' });
      setSelectedHospital(selected ?? undefined);
    },
    [profile]
  );

  const selectMedicalSpecialities = useCallback(
    (medicalSpecialities: MedicalSpecialityEntity[]) => {
      if (!profile) {
        return;
      }
      setProfile({
        ...profile,
        main_speciality: medicalSpecialities.length > 0 ? medicalSpecialities[0].speciality_code : '',
        speciality_2: medicalSpecialities.length > 1 ? medicalSpecialities[1].speciality_code : '',
        speciality_3: medicalSpecialities.length > 2 ? medicalSpecialities[2].speciality_code : '',
        speciality_4: medicalSpecialities.length > 3 ? medicalSpecialities[3].speciality_code : '',
      });
    },
    [profile]
  );

  return {
    hospitalInputType,
    hospitalOptions,
    hospitals,
    hospitalSearchText,
    profile,
    selectedHospital,
    selectHospital,
    selectMedicalSpecialities,
    setHospitalInputType,
    setHospitalName,
    setHospitalSearchText,
    setProfile,
  };
};
