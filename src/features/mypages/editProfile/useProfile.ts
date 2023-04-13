import React from 'react';
import { useRecoilState } from 'recoil';
import { editProfileScreenState } from './editProfileScreenState';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchEmail } from '@/hooks/api/account/useFetchEmail';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchPrefecture } from '@/hooks/api/prefecture/useFetchPrefecture';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import type { ProfileEntityType } from '@/types/entities/profileEntity';
import type { EmailEntityType } from '@/types/entities/emailEntity';
import type { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';
import type { HospitalEntity } from '@/types/entities/hospitalEntity';
import type { EditProfileScreenStateType } from './editProfileScreenState';

export type UseProfile = {
  profile: ProfileEntityType | undefined;
  email: EmailEntityType | undefined;
  medicalSpeciality: MedicalSpecialityEntity[] | undefined;
  prefecture: PrefectureEntityType[] | undefined;
  hospital: HospitalEntity | undefined;
  editProfileScreen: EditProfileScreenStateType;
  showModal: boolean;
  openEdit: () => void;
  getMedicalSpecialityNameByCode: (
    code: string | undefined
  ) => string | undefined;
  getPrefectureNameByCode: (code: string | undefined) => string | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useProfile = (): UseProfile => {
  const { profile } = useFetchProfile();
  const { email } = useFetchEmail();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { prefecture } = useFetchPrefecture();
  const { hospital } = useFetchHospital(profile?.hospital_id);

  const [editProfileScreen, setEditProfileScreen] = useRecoilState(
    editProfileScreenState
  );
  // モーダルからモーダルを表示（2重表示）する場合があるので、グローバルではなくローカルステートで定義し props で渡せるようにする
  const [showModal, setShowModal] = React.useState(false);

  const openEdit = () => {
    setEditProfileScreen((oldValues) => ({
      ...oldValues,
      isEditOpen: true,
      isDetailOpen: false,
    }));
  };

  const getMedicalSpecialityNameByCode = React.useCallback(
    (code: string | undefined): string | undefined => {
      if (!code || !medicalSpecialities) return undefined;

      const matched = medicalSpecialities.find(
        (ms) => ms.speciality_code === code
      );
      return matched?.name;
    },
    [medicalSpecialities]
  );

  const getPrefectureNameByCode = React.useCallback(
    (code: string | undefined): string | undefined => {
      if (!code || !prefecture) return undefined;

      const matched = prefecture.find((pref) => pref.code === code);
      return matched?.name;
    },
    [prefecture]
  );

  return {
    profile,
    email,
    medicalSpeciality: medicalSpecialities,
    prefecture,
    hospital,
    editProfileScreen,
    showModal,
    openEdit,
    getMedicalSpecialityNameByCode,
    getPrefectureNameByCode,
    setShowModal,
  };
};
