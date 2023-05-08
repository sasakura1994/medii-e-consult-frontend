import { atom } from 'recoil';
import type { ProfileEntity } from '@/types/entities/profileEntity';

export const profileState = atom<ProfileEntity>({
  key: 'profile',
  default: undefined,
});
