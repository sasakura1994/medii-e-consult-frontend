import { atom } from 'recoil';

export const whatListenState = atom<string>({
  key: 'whatListen',
  default: '',
});
