import { atom } from 'recoil';

export const isChatRoomSelectedState = atom<boolean>({
  key: 'isChatRoomSelected',
  default: false,
});
