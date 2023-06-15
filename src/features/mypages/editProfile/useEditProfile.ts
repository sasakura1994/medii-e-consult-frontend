import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useAxios } from '@/hooks/network/useAxios';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
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
  const { axios } = useAxios();
  const [profile, setProfile] = useState<EditingProfile>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hospitalInputType, setHospitalInputType] = useState<'free' | 'select'>(
    'select'
  );
  const [hospitals, setHospitals] = useState<HospitalEntity[]>([]);

  const { profile: fetchedProfile } = useFetchProfile();
  const { hospital: defaultHospital } = useFetchHospital(
    isInitialized ? fetchedProfile?.hospital_id : undefined
  );

  const selectedHospital = useMemo((): Option | undefined => {
    if (!profile || profile.hospital_id === '') {
      return undefined;
    }

    if (
      defaultHospital &&
      profile.hospital_id === defaultHospital?.hospital_id
    ) {
      return {
        value: defaultHospital.hospital_id,
        label: defaultHospital.hospital_name,
      };
    }

    const hospital = hospitals.find(
      (hospital) => hospital.hospital_id === profile.hospital_id
    );
    if (hospital) {
      return {
        value: hospital.hospital_id,
        label: hospital.hospital_name,
      };
    }

    return {
      value: profile.hospital_id,
      label: '',
    };
  }, [defaultHospital, profile, hospitals]);

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
    setHospitalInputType(
      fetchedProfile.hospital_id === '' && fetchedProfile.hospital_name !== ''
        ? 'free'
        : 'select'
    );
    setIsInitialized(true);
  }, [fetchedProfile, isInitialized]);

  const loadHospitals = useCallback(
    async (inputValue: string): Promise<Option[]> => {
      if (!profile) {
        return [];
      }

      const response = await axios
        .get<HospitalEntity[]>(
          `/hospital/search_hospitals?prefecture_code=${
            profile.prefecture_code
          }&search=${encodeURIComponent(inputValue)}`
        )
        .catch((error) => {
          console.error(error);
          return null;
        });
      if (!response) {
        return [];
      }

      setHospitals(response.data);

      return response.data.map((hospital) => ({
        value: hospital.hospital_id,
        label: hospital.hospital_name,
      }));
    },
    [axios, profile]
  );

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

  return {
    hospitalInputType,
    hospitals,
    loadHospitals,
    profile,
    selectedHospital,
    setHospitalInputType,
    setHospitalName,
    setHospitals,
    setProfile,
  };
};
