import { atom } from 'recoil';
import type { ProfileEntity } from '@/types/entities/profileEntity';

export const accountIdState = atom<string>({
  key: 'accountId',
  default: undefined,
});

export const profileState = atom<ProfileEntity>({
  key: 'profile',
  default: undefined,
});
