import { atom } from 'recoil';
export type EditProfileStateType = {
  screen: {
    isEditOpen: boolean;
    isDetailOpen: boolean;
    isDepartmentOpen: boolean;
  };
};

export const editProfileState = atom<EditProfileStateType>({
  key: 'editProfile',
  default: {
    screen: {
      isEditOpen: false,
      isDetailOpen: true,
      isDepartmentOpen: false,
    },
  },
});
