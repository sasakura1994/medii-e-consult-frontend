import { atom } from 'recoil';
import type { ProfileEntity } from '@/types/entities/profileEntity';

export const profileState = atom<ProfileEntity>({
  key: 'profile',
  default: undefined,
});

export const tokenState = atom<string>({
  key: 'token',
  default: '',
});

export const isTokenInitializedState = atom<boolean>({
  key: 'isTokenInitialized',
  default: false,
});

export const isTokenRefreshedState = atom<boolean>({
  key: 'isTokenRefreshed',
  default: false,
});
