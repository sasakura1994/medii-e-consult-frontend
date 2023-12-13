import React from 'react';
import { UseEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { UserInfoNames } from './UserInfoNames';
import { EditProfileBirthday } from './EditProfileBirthday';
import { Heading } from '@/components/Parts/Text/Heading';

type Props = UseEditProfile & EditProfileProps;

export const UserInfo = (props: Props) => {
  const { addBlurFields, blurFields, isRegisterMode, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <div>
      <Heading as="h2" className="mb-6">
        利用者情報
      </Heading>

      <UserInfoNames
        addBlurFields={addBlurFields}
        blurFields={blurFields}
        isEnabled={isRegisterMode}
        profile={profile}
        setProfileFields={setProfileFields}
      />

      <div className="mt-4">
        <EditProfileBirthday isEnabled={isRegisterMode} profile={profile} setProfileFields={setProfileFields} />
      </div>
    </div>
  );
};
