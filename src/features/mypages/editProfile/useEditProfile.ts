import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { EditProfileProps } from './EditProfile';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
import { Query } from './useEditProfilePage';

const editProfileFormDataKey = 'EditProfile::formData';

const numberToString = (value: number) => (value === 0 ? '' : value.toString());

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

export type HospitalInputType = 'free' | 'select';

type AccountType = 'doctor' | 'student';

export type UseEditProfile = {
  accountType: AccountType;
  addBlurFields: (fieldName: string) => void;
  blurFields: string[];
  errorMessage: string;
  hospitalInputType: HospitalInputType;
  hospitalOptions: Option[];
  hospitals: HospitalEntity[];
  hospitalSearchText: string;
  isCompleted: boolean;
  isHospitalDisabled: boolean;
  isSending: boolean;
  isStudentToDoctor: boolean;
  profile?: EditingProfile;
  saveProfile: () => Promise<boolean>;
  selectedHospital?: Option;
  selectHospital: (selected: Option | null) => void;
  selectInChargeMedicalSpecialities: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  selectedQuestionaryItemIds: string[];
  setAccountType: Dispatch<SetStateAction<AccountType>>;
  setHospitalInputType: Dispatch<SetStateAction<HospitalInputType>>;
  setHospitalName: (hospitalName: string) => void;
  setHospitalSearchText: Dispatch<SetStateAction<string>>;
  setProfileFields: (data: Partial<EditingProfile>) => void;
  submit: () => void;
  toggleQuestionaryItem: (questionaryItemId: number) => void;
};

export const useEditProfile = (props: EditProfileProps): UseEditProfile => {
  const { isRegisterMode } = props;
  const router = useRouter();
  const { student_to_doctor } = router.query as Query;
  const isStudentToDoctor = student_to_doctor !== undefined;

  // setProfileはsetProfileFieldsでラップしているので基本使わない
  const [profile, setProfile] = useState<EditingProfile>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hospitalInputType, setHospitalInputType] = useState<HospitalInputType>('select');
  const [accountType, setAccountType] = useState<AccountType>('doctor');
  const [hospitalSearchText, setHospitalSearchText] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Option>();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [blurFields, setBlurFields] = useState<string[]>([]);

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

  const isHospitalDisabled = ['STUDENT'].includes(profile?.main_speciality ?? '');

  const isCompleted = useMemo(() => {
    if (!profile) {
      return false;
    }

    if (isRegisterMode) {
      if (
        profile.last_name === '' ||
        profile.first_name === '' ||
        profile.last_name_hira === '' ||
        profile.first_name_hira === '' ||
        profile.birthday_year === '' ||
        profile.birthday_month === '' ||
        profile.birthday_day === ''
      ) {
        return false;
      }
    }

    if (accountType === 'student') {
      return true;
    }

    if (!isHospitalDisabled) {
      if (
        profile.qualified_year === '' ||
        profile.prefecture_code === '' ||
        (hospitalInputType === 'select' && profile.hospital_id === '') ||
        (hospitalInputType === 'free' && profile.hospital_name === '')
      ) {
        return false;
      }
    }

    return profile.main_speciality !== '';
  }, [profile, isRegisterMode, accountType, isHospitalDisabled, hospitalInputType]);

  useEffect(() => {
    if (!defaultHospital) {
      return;
    }
    setSelectedHospital({
      value: defaultHospital.hospital_id,
      label: defaultHospital.hospital_name,
    });
  }, [defaultHospital]);

  const getDraftProfile = useCallback(() => {
    if (!isRegisterMode) {
      return undefined;
    }

    const draftJson = loadLocalStorage(editProfileFormDataKey);
    if (!draftJson) {
      return undefined;
    }

    return JSON.parse(draftJson);
  }, [isRegisterMode]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (!fetchedProfile) {
      return;
    }

    const draftProfile = getDraftProfile();
    const currentProfile = draftProfile ?? fetchedProfile;

    if (draftProfile) {
      setProfile(draftProfile);
    } else {
      setProfile({
        ...fetchedProfile,
        birthday_year: fetchedProfile.birthday_year === 9999 ? '1990' : numberToString(fetchedProfile.birthday_year),
        birthday_month: fetchedProfile.birthday_year === 9999 ? '1' : numberToString(fetchedProfile.birthday_month),
        birthday_day: fetchedProfile.birthday_year === 9999 ? '1' : numberToString(fetchedProfile.birthday_day),
        qualified_year: numberToString(
          isStudentToDoctor && fetchedProfile.graduation_year
            ? fetchedProfile.graduation_year
            : fetchedProfile.qualified_year
        ),
        main_speciality: isStudentToDoctor ? '' : fetchedProfile.main_speciality,
        graduated_university: fetchedProfile.graduated_university === 'null' ? '' : fetchedProfile.graduated_university,
        is_mail_notify:
          !fetchedProfile.is_mail_notify && !fetchedProfile.is_push_notify ? true : fetchedProfile.is_mail_notify,
        is_push_notify:
          !fetchedProfile.is_mail_notify && !fetchedProfile.is_push_notify ? true : fetchedProfile.is_push_notify,
      });
    }

    setHospitalInputType(currentProfile.hospital_id === '' && currentProfile.hospital_name !== '' ? 'free' : 'select');
    setAccountType(currentProfile.main_speciality === 'STUDENT' && !isStudentToDoctor ? 'student' : 'doctor');
    setIsInitialized(true);
  }, [fetchedProfile, getDraftProfile, isInitialized, isStudentToDoctor]);

  // 下書き保存も同時に行うため基本的にはsetProfileでなくこれを使う
  const setProfileFields = useCallback(
    (data: Partial<EditingProfile>) => {
      if (!profile) {
        return;
      }

      const updatedProfile = { ...profile, ...data };
      setProfile(updatedProfile);

      if (isRegisterMode) {
        saveLocalStorage(editProfileFormDataKey, JSON.stringify(updatedProfile));
      }
    },
    [isRegisterMode, profile]
  );

  const setHospitalName = useCallback(
    (hospitalName: string) => {
      if (!profile) {
        return;
      }
      setProfileFields({ hospital_name: hospitalName });
      setHospitalInputType('free');
    },
    [profile, setProfileFields]
  );

  const selectHospital = useCallback(
    (selected: Option | null) => {
      if (!profile) {
        return;
      }
      setProfileFields({ hospital_id: selected?.value ?? '' });
      setSelectedHospital(selected ?? undefined);
    },
    [profile, setProfileFields]
  );

  const selectInChargeMedicalSpecialities = useCallback(
    (medicalSpecialities: MedicalSpecialityEntity[]) => {
      if (!profile) {
        return;
      }
      setProfileFields({
        speciality_2: medicalSpecialities.length > 0 ? medicalSpecialities[0].speciality_code : '',
        speciality_3: medicalSpecialities.length > 1 ? medicalSpecialities[1].speciality_code : '',
        speciality_4: medicalSpecialities.length > 2 ? medicalSpecialities[2].speciality_code : '',
      });
    },
    [profile, setProfileFields]
  );

  const saveProfile = useCallback(async (): Promise<boolean> => {
    setIsSending(true);
    setErrorMessage('');

    const data = { ...profile };

    if (accountType === 'student') {
      data.main_speciality = 'STUDENT';
      data.speciality_2 = '';
      data.speciality_3 = '';
      data.speciality_4 = '';
      data.qualified_year = '0';
      data.doctor_qualified_year = 9999;
      data.doctor_qualified_month = 4;
      data.doctor_qualified_day = 1;
      data.expertise = '';
      data.qualification = '';
      data.prefecture_code = '';
      data.hospital_id = '';
      data.hospital_name = '';
      data.want_to_be_consultant = false;
    }

    if (!data.is_mail_notify && !data.is_push_notify) {
      data.is_mail_notify = true;
      data.is_push_notify = true;
    }

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
      if (key === 'is_huf_user') {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, (data as any)[key]);
    });

    const response = await updateProfile(formData).catch((error) => {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
      return null;
    });

    setIsSending(false);

    if (!response) {
      return false;
    }

    mutateFetchProfile();
    return true;
  }, [accountType, hospitalInputType, isHospitalDisabled, profile, updateProfile]);

  const submit = useCallback(async () => {
    if (!profile) {
      return;
    }

    const result = await saveProfile();
    if (!result) {
      return;
    }

    if (isRegisterMode || profile.need_to_send_confimation) {
      router.push('/document');
    } else {
      router.push('/editprofile/completed');
    }
  }, [profile, saveProfile, isRegisterMode, router]);

  const toggleQuestionaryItem = useCallback(
    (questionaryItemId: number) => {
      if (!profile) {
        return;
      }

      const idString = questionaryItemId.toString();

      if (selectedQuestionaryItemIds.includes(idString)) {
        setProfileFields({
          questionary_selected_ids_csv: selectedQuestionaryItemIds
            .filter((questionaryItemId) => questionaryItemId !== idString)
            .join(','),
        });
      } else {
        setProfileFields({
          questionary_selected_ids_csv: [...selectedQuestionaryItemIds, idString].join(','),
        });
      }
    },
    [profile, selectedQuestionaryItemIds, setProfileFields]
  );

  const addBlurFields = useCallback(
    (fieldName: string) => {
      if (blurFields.includes(fieldName)) {
        return;
      }
      setBlurFields([...blurFields, fieldName]);
    },
    [blurFields]
  );

  return {
    accountType,
    addBlurFields,
    blurFields,
    errorMessage,
    hospitalInputType,
    hospitalOptions,
    hospitals,
    hospitalSearchText,
    isCompleted,
    isHospitalDisabled,
    isSending,
    isStudentToDoctor,
    profile,
    saveProfile,
    selectedHospital,
    selectHospital,
    selectInChargeMedicalSpecialities,
    selectedQuestionaryItemIds,
    setAccountType,
    setHospitalInputType,
    setHospitalName,
    setHospitalSearchText,
    setProfileFields,
    submit,
    toggleQuestionaryItem,
  };
};
