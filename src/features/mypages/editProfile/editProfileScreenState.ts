import { atom } from 'recoil';

export type EditProfileScreenStateType = {
  isEditOpen: boolean;
  isDetailOpen: boolean;
};

export const editProfileScreenState = atom<EditProfileScreenStateType>({
  key: 'editProfileScreen',
  default: {
    isEditOpen: false,
    isDetailOpen: true,
  },
});
