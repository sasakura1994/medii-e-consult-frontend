import React from 'react';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useRecoilState } from 'recoil';
import { hospitalState } from '@/globalStates/hospitalState';
import type { AxiosError } from 'axios';
import type { HospitalEntityType } from '@/types/entities/hospitalEntity';

export type UseFetchHospitalType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  hospital: HospitalEntityType | undefined;
};

const endpoint = '/api/hospital/hospital_by_id';

export const useFetchHospital = (
  hospitalId: string | undefined
): UseFetchHospitalType => {
  const [hospital, setHospital] = useRecoilState(hospitalState);

  const { isLoading, error, data } = useAuthenticatedSWR<HospitalEntityType[]>(
    `${endpoint}?hospital_id=${hospitalId}`
  );

  React.useEffect(() => {
    setHospital((oldValues) => ({
      ...oldValues,
      ...data,
    }));
  }, [data]);

  return {
    isLoading,
    error,
    hospital,
  };
};
