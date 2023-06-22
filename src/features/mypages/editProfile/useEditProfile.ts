import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditProfileProps } from './EditProfile';

const editProfileFormDataKey = 'EditProfile::formData';

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

  // setProfileはsetProfileFieldsでラップしているので基本使わない
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

  const selectedQuestionaryItemIds: string[] = useMemo(
    () => profile?.questionary_selected_ids_csv?.split(/,/) ?? [],
    [profile?.questionary_selected_ids_csv]
  );

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

  // 下書き保存も同時に行うため基本的にはsetProfileでなくこれを使う
  const setProfileFields = useCallback(
    (data: Partial<EditingProfile>) => {
      if (!profile) {
        return;
      }

      const updatedProfile = { ...profile, ...data };
      setProfile(updatedProfile);

      if (isRegisterMode) {
        localStorage.setItem(editProfileFormDataKey, JSON.stringify(updatedProfile));
      }
    },
    [isRegisterMode, profile]
  );

  const setHospitalName = useCallback(
    (hospitalName: string) => {
      if (!profile) {
        return;
      }
      setProfileFields({ ...profile, hospital_name: hospitalName });
      setHospitalInputType('free');
    },
    [profile, setProfileFields]
  );

  const selectHospital = useCallback(
    (selected: Option | null) => {
      if (!profile) {
        return;
      }
      setProfileFields({ ...profile, hospital_id: selected?.value ?? '' });
      setSelectedHospital(selected ?? undefined);
    },
    [profile, setProfileFields]
  );

  const selectMedicalSpecialities = useCallback(
    (medicalSpecialities: MedicalSpecialityEntity[]) => {
      if (!profile) {
        return;
      }
      setProfileFields({
        ...profile,
        main_speciality: medicalSpecialities.length > 0 ? medicalSpecialities[0].speciality_code : '',
        speciality_2: medicalSpecialities.length > 1 ? medicalSpecialities[1].speciality_code : '',
        speciality_3: medicalSpecialities.length > 2 ? medicalSpecialities[2].speciality_code : '',
        speciality_4: medicalSpecialities.length > 3 ? medicalSpecialities[3].speciality_code : '',
      });
    },
    [profile, setProfileFields]
  );

  const submit = useCallback(async () => {
    if (!profile) {
      return;
    }

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

    if (isRegisterMode || profile.need_to_send_confimation) {
      router.push('/document');
    } else {
      router.push('/editprofile/completed');
    }
  }, [profile, isHospitalDisabled, hospitalInputType, updateProfile, isRegisterMode, router]);

  const toggleQuestionaryItem = useCallback(
    (questionaryItemId: number) => {
      if (!profile) {
        return;
      }

      const idString = questionaryItemId.toString();

      if (selectedQuestionaryItemIds.includes(idString)) {
        setProfileFields({
          ...profile,
          questionary_selected_ids_csv: selectedQuestionaryItemIds
            .filter((questionaryItemId) => questionaryItemId !== idString)
            .join(','),
        });
      } else {
        setProfileFields({
          ...profile,
          questionary_selected_ids_csv: [...selectedQuestionaryItemIds, idString].join(','),
        });
      }
    },
    [profile, selectedQuestionaryItemIds, setProfileFields]
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
    setProfileFields,
    submit,
    toggleQuestionaryItem,
  };
};
