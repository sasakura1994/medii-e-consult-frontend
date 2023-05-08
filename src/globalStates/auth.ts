import { atom } from 'recoil';

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
