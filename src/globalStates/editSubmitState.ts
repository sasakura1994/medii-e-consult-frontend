import { atom } from 'recoil';

export const emailSubmitState = atom<boolean>({
  key: 'emailState',
  default: false
});
