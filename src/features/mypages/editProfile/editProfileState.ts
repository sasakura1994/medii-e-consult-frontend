import { atom } from 'recoil';

export type EditProfileScreenStateType = {
  isEditOpen: boolean;
  isDetailOpen: boolean;
  isDepartmentOpen: boolean;
};

export const editProfileScreenState = atom<EditProfileScreenStateType>({
  key: 'editProfileScreen',
  default: {
    isEditOpen: false,
    isDetailOpen: true,
    isDepartmentOpen: false,
  },
});

// export type EditProfileStateType = {};

// export const editProfileState = atom<EditProfileStateType>({
//   key: 'editProfile',
//   default: {},
// });
