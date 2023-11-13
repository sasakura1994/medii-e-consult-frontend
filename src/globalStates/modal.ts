import { atom } from 'recoil';

export const openModalCountState = atom<number>({
  key: 'openModalCount',
  default: 0,
});
