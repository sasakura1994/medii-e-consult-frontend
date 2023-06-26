import { atom } from 'recoil';

export const accountIdState = atom<string>({
  key: 'accountId',
  default: undefined,
});
