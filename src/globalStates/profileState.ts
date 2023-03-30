import { atom } from 'recoil';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export const profileState = atom<ProfileEntityType>({
  key: 'profile',
  default: undefined,
});
