import React from 'react';
import { TextField } from '@/components/Parts/Form/TextField';
import { UseEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { UserInfoNames } from './UserInfoNames';
import { EditProfileHeading } from './EditProfileHeading';
import { EditProfileBirthday } from './EditProfileBirthday';

type Props = UseEditProfile & EditProfileProps;

export const UserInfo = (props: Props) => {
  const { isRegisterMode, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
      <EditProfileHeading className="mb-4">利用者情報</EditProfileHeading>

      <UserInfoNames isEnabled={isRegisterMode} profile={profile} setProfileFields={setProfileFields} />

      <div className="mb-4">
        <EditProfileBirthday isEnabled={isRegisterMode} profile={profile} setProfileFields={setProfileFields} />
      </div>

      <div className="mb-4">
        <EditProfileLabel required={isRegisterMode ? false : undefined}>卒業大学</EditProfileLabel>
        <TextField
          name="graduated_university"
          id="graduated_university"
          disabled={!isRegisterMode}
          placeholder="大学名"
          value={profile.graduated_university ?? ''}
          onChange={(e) => setProfileFields({ graduated_university: e.target.value })}
        />
      </div>
    </div>
  );
};
