import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';
import { editProfileScreenState } from './editProfileScreenState';
import { modalState } from '@/globalStates/modalState';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchEmail } from '@/hooks/api/account/useFetchEmail';
import { useFetchMedicalSpeciality } from '@/hooks/api/medicalCategory/useFetchMedicalSpeciality';
import { useFetchPrefecture } from '@/hooks/api/prefecture/useFetchPrefecture';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import type { ProfileEntityType } from '@/types/entities/profileEntity';
import type { EmailEntityType } from '@/types/entities/emailEntity';
import type { MedicalSpecialityEntityType } from '@/types/entities/medicalSpecialityEntity';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';
import type { HospitalEntityType } from '@/types/entities/hospitalEntity';
import type { EditProfileScreenStateType } from './editProfileScreenState';

export type UseProfile = {
  profile: ProfileEntityType | undefined;
  email: EmailEntityType | undefined;
  medicalSpeciality: MedicalSpecialityEntityType[] | undefined;
  prefecture: PrefectureEntityType[] | undefined;
  hospital: HospitalEntityType | undefined;
  editProfileScreen: EditProfileScreenStateType;
  showModal: boolean;
  openEdit: () => void;
  openDetail: () => void;
  openMedicalSpeciality: () => void;
  getMedicalSpecialityNameByCode: (
    code: string | undefined
  ) => string | undefined;
  getPrefectureNameByCode: (code: string | undefined) => string | undefined;
};

export const useProfile = (): UseProfile => {
  const { profile } = useFetchProfile();
  const { email } = useFetchEmail();
  const { medicalSpeciality } = useFetchMedicalSpeciality();
  const { prefecture } = useFetchPrefecture();
  const { hospital } = useFetchHospital(profile?.hospital_id);

  const [editProfileScreen, setEditProfileScreen] = useRecoilState(
    editProfileScreenState
  );
  const setProfile = useSetRecoilState(profileState);
  const [showModal, showShowModal] = useRecoilState(modalState);

  const openEdit = () => {
    setEditProfileScreen((oldValues) => ({
      ...oldValues,
      isEditOpen: true,
      isDetailOpen: false,
    }));
    console.log('profile', profile);
  };

  const openDetail = () => {
    console.log('openDetail');
  };

  const openMedicalSpeciality = () => {
    showShowModal(true);
  };

  const resetOpen = () => {
    setEditProfileScreen((oldValues) => ({
      ...oldValues,
      isEditOpen: false,
      isDetailOpen: true,
    }));
  };

  const getMedicalSpecialityNameByCode = React.useCallback(
    (code: string | undefined): string | undefined => {
      if (!code || !medicalSpeciality) return undefined;

      const matched = medicalSpeciality.find(
        (ms) => ms.speciality_code === code
      );
      return matched?.name;
    },
    [medicalSpeciality]
  );

  const getPrefectureNameByCode = React.useCallback(
    (code: string | undefined): string | undefined => {
      if (!code || !prefecture) return undefined;

      const matched = prefecture.find((pref) => pref.code === code);
      return matched?.name;
    },
    [prefecture]
  );

  // React.useEffect(() => {
  //   console.log('medicalSpeciality', medicalSpeciality);
  // }, [medicalSpeciality]);

  return {
    profile,
    email,
    medicalSpeciality,
    prefecture,
    hospital,
    editProfileScreen,
    showModal,
    openEdit,
    openDetail,
    openMedicalSpeciality,
    getMedicalSpecialityNameByCode,
    getPrefectureNameByCode,
  };
};
