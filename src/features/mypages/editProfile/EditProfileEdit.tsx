import React from 'react';
import { useEditProfile } from './useEditProfile';

export const EditProfileEdit: React.FC = () => {
  const { editProfileScreen } = useEditProfile();

  if (!editProfileScreen.isEditOpen) {
    return null;
  }

  return (
    <>
      <h2
        className="mb-6 text-center text-2xl leading-8"
        data-testid="h-edit-profile-edit"
      >
        プロフィール
      </h2>

      <div className="mb-10">
        <h3 className="mb-4 text-primary">■ 利用者情報</h3>
        <div className="flex"></div>
      </div>
    </>
  );
};
