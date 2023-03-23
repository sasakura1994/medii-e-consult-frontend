import { atom } from 'recoil';
import type { MedicalSpecialityEntityType } from '@/types/entities/medicalSpecialityEntity';

export const medicalSpecialityState = atom<MedicalSpecialityEntityType[]>({
  key: 'medicalSpeciality',
  default: undefined,
});
