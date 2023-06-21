import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditProfileProps } from './EditProfile';

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

export const useEditProfile = (props: EditProfileProps) => {
  const { isRegisterMode } = props;
  const router = useRouter();

  const [profile, setProfile] = useState<EditingProfile>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hospitalInputType, setHospitalInputType] = useState<'free' | 'select'>('select');
  const [hospitalSearchText, setHospitalSearchText] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Option>();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { profile: fetchedProfile } = useFetchProfile();
  const { hospital: defaultHospital } = useFetchHospital(isInitialized ? fetchedProfile?.hospital_id : undefined);
  const { hospitals } = useSearchHospitals(profile?.prefecture_code, hospitalSearchText);
  const { updateProfile } = useUpdateProfile();

  const hospitalOptions = useMemo<Option[]>(
    () => hospitals?.map((h) => ({ label: h.hospital_name, value: h.hospital_id })),
    [hospitals]
  );

  const selectedQuestionaryItemIds: string[] = profile?.questionary_selected_ids_csv?.split(/,/) ?? [];

  const isHospitalDisabled = ['STUDENT', 'SHIKAKOUKUGEKA'].includes(profile?.main_speciality ?? '');

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

  const submit = useCallback(async () => {
    setIsSending(true);
    setErrorMessage('');

    const data = { ...profile };

    if (isHospitalDisabled) {
      data.hospital_id = '';
      data.hospital_name = '';
    } else if (hospitalInputType === 'select') {
      data.hospital_name = '';
    } else if (hospitalInputType === 'free') {
      data.hospital_id = '';
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, (data as any)[key]);
    });

    const response = await updateProfile(formData).catch((error) => {
      console.error(error);
      setErrorMessage(error.response.data.message || 'エラーが発生しました');
      return null;
    });

    setIsSending(false);

    if (!response) {
      return;
    }

    mutateFetchProfile();
    router.push('/editprofile/completed');
  }, [profile, isHospitalDisabled, hospitalInputType, updateProfile, router]);

  const toggleQuestionaryItem = useCallback(
    (questionaryItemId: number) => {
      if (!profile) {
        return;
      }

      const idString = questionaryItemId.toString();

      if (selectedQuestionaryItemIds.includes(idString)) {
        setProfile({
          ...profile,
          questionary_selected_ids_csv: selectedQuestionaryItemIds
            .filter((questionaryItemId) => questionaryItemId !== idString)
            .join(','),
        });
      } else {
        setProfile({
          ...profile,
          questionary_selected_ids_csv: [...selectedQuestionaryItemIds, idString].join(','),
        });
      }
    },
    [profile, selectedQuestionaryItemIds]
  );

  return {
    errorMessage,
    hospitalInputType,
    hospitalOptions,
    hospitals,
    hospitalSearchText,
    isSending,
    profile,
    selectedHospital,
    selectHospital,
    selectMedicalSpecialities,
    selectedQuestionaryItemIds,
    setHospitalInputType,
    setHospitalName,
    setHospitalSearchText,
    setProfile,
    submit,
    toggleQuestionaryItem,
  };
};
