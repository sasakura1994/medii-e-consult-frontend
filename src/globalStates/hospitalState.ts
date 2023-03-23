import { atom } from 'recoil';
import type { HospitalEntityType } from '@/types/entities/hospitalEntity';

export const hospitalState = atom<HospitalEntityType>({
  key: 'hospital',
  default: undefined,
});
