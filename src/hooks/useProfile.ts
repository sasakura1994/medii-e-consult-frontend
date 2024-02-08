import { useCallback, useMemo } from 'react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchEmail } from '@/hooks/api/account/useFetchEmail';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchPrefecture } from '@/hooks/api/prefecture/useFetchPrefecture';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import type { ProfileEntity } from '@/types/entities/profileEntity';
import type { EmailEntityType } from '@/types/entities/emailEntity';
import type { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';
import type { HospitalEntity } from '@/types/entities/hospitalEntity';
import { useDoctor } from './useDoctor';

export type UseProfile = {
  profile: ProfileEntity | undefined;
  email: EmailEntityType | undefined;
  hospitalName: string;
  isNeedToInputProfile: boolean;
  isOnboardingQuestionaryIsNotNeeded: boolean;
  isStudentCanToBeDoctor: boolean;
  medicalSpeciality: MedicalSpecialityEntity[] | undefined;
  prefecture: PrefectureEntityType[] | undefined;
  hospital: HospitalEntity | undefined;
  getPrefectureNameByCode: (code: string | undefined) => string | undefined;
};

// プロフィールを便利に扱うためのカスタムフック
export const useProfile = (): UseProfile => {
  const { profile } = useFetchProfile();
  const { email } = useFetchEmail();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { prefecture } = useFetchPrefecture();
  const { hospital } = useFetchHospital(profile?.hospital_id);
  const { calculateExperienceYear } = useDoctor();

  const hospitalName = useMemo(() => {
    if (!profile) {
      return '';
    }

    if ((profile.hospital_id || '') === '') {
      return profile.hospital_name;
    }

    return hospital?.hospital_name ?? '';
  }, [profile, hospital]);

  const isNeedToInputProfile = useMemo(
    () => profile !== undefined && profile.status === 'VERIFIED' && profile.birthday_year === 9999,
    [profile]
  );

  const isOnboardingQuestionaryIsNotNeeded = useMemo(() => {
    if (!profile) {
      return false;
    }
    return profile.main_speciality === 'KENSYU' || calculateExperienceYear(profile.qualified_year) < 3;
  }, [calculateExperienceYear, profile]);

  const isStudentCanToBeDoctor = useMemo(() => {
    if (!profile?.graduation_year) {
      return false;
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    return (
      (year > profile.graduation_year || (year === profile.graduation_year && month >= 4)) &&
      profile.main_speciality === 'STUDENT' &&
      profile.status === 'VERIFIED'
    );
  }, [profile]);

  const getPrefectureNameByCode = useCallback(
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
    hospitalName,
    isNeedToInputProfile,
    isOnboardingQuestionaryIsNotNeeded,
    isStudentCanToBeDoctor,
    medicalSpeciality: medicalSpecialities,
    prefecture,
    hospital,
    getPrefectureNameByCode,
  };
};
