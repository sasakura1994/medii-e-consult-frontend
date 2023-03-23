import React from 'react';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useRecoilState } from 'recoil';
import { medicalSpecialityState } from '@/globalStates/medicalSpecialityState';
import type { AxiosError } from 'axios';
import type { MedicalSpecialityEntityType } from '@/types/entities/medicalSpecialityEntity';

export type UseFetchMedicalSpecialityType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  medicalSpeciality: MedicalSpecialityEntityType[] | undefined;
};

const endpoint = '/api/medical_category/medical_specialities';

export const useFetchMedicalSpeciality = (): UseFetchMedicalSpecialityType => {
  const [medicalSpeciality, setMedicalSpeciality] = useRecoilState(
    medicalSpecialityState
  );

  const { isLoading, error, data } =
    useAuthenticatedSWR<MedicalSpecialityEntityType[]>(endpoint);

  React.useEffect(() => {
    let res: MedicalSpecialityEntityType[] = [];
    if (data) res = data;
    setMedicalSpeciality(() => res);
  }, [data]);

  return {
    isLoading,
    error,
    medicalSpeciality,
  };
};
