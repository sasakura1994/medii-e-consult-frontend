import { ConsultExampleGender } from '@/types/entities/ConsultExampleEntity';
import { useCallback } from 'react';

type UseConsultExample = {
  getAgeText: (age: number) => string;
  getGenderText: (gender: ConsultExampleGender, age: number | null) => string;
};

export const useConsultExample = (): UseConsultExample => {
  const getAgeText = useCallback(
    (age: number) => (age >= 10 ? `${age}代` : `小児(${age}歳)`),
    []
  );

  const getGenderText = useCallback(
    (gender: ConsultExampleGender, age: number | null) => {
      if (age !== null && age < 10) {
        return gender === 'man' ? '男児' : '女児';
      }
      return gender === 'man' ? '男性' : '女性';
    },
    []
  );

  return { getAgeText, getGenderText };
};
