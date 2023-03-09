import React from 'react';
import { editProfileScreenState } from './editProfileState';
import { useRecoilState } from 'recoil';
import type { EditProfileScreenStateType } from './editProfileState';

export type UseEditProfile = {
  editProfileScreen: EditProfileScreenStateType;
  openEdit: () => void;
};

export const useEditProfile = () => {
  const [editProfileScreen, setEditProfileScreen] = useRecoilState(
    editProfileScreenState
  );

  const openEdit = () => {
    setEditProfileScreen((oldValues) => ({
      ...oldValues,
      isEditOpen: true,
      isDetailOpen: false,
      isDepartmentOpen: false,
    }));
  };

  const openDetail = () => {
    console.log('openDetail');
  };

  const openDepartment = () => {
    console.log('openDepartment');
  };

  const resetOpen = () => {
    setEditProfileScreen((oldValues) => ({
      ...oldValues,
      isEditOpen: false,
      isDetailOpen: true,
      isDepartmentOpen: false,
    }));
  };

  // For debug
  React.useEffect(() => {
    console.log(editProfileScreen);
  }, [editProfileScreen]);

  return {
    editProfileScreen,
    openEdit,
  };
};
