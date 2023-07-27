import React from 'react';
import { TextField } from '@/components/Parts/Form/TextField';
import { useEditProfile } from './useEditProfile';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';

type Props = Pick<ReturnType<typeof useEditProfile>, 'profile' | 'setProfileFields'> & {
  isEnabled: boolean;
};

export const UserInfoNames = (props: Props) => {
  const { isEnabled, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-4 lg:flex lg:gap-6">
        <div>
          <EditProfileLabel required={isEnabled ? true : undefined}>姓</EditProfileLabel>
          <TextField
            name="last_name"
            value={profile.last_name}
            onChange={(e) => setProfileFields({ last_name: e.target.value })}
            disabled={!isEnabled}
            id="last_name"
            className="mb-4 lg:mb-0"
            placeholder="姓"
          />
        </div>

        <div>
          <EditProfileLabel required={isEnabled ? true : undefined}>名</EditProfileLabel>
          <TextField
            name="first_name"
            value={profile.first_name}
            onChange={(e) => setProfileFields({ first_name: e.target.value })}
            disabled={!isEnabled}
            id="first_name"
            placeholder="名"
          />
        </div>
      </div>

      <div className="mb-4 lg:flex lg:gap-6">
        <div>
          <EditProfileLabel required={isEnabled ? true : undefined}>姓（かな）</EditProfileLabel>
          <TextField
            name="last_name_hira"
            value={profile.last_name_hira}
            onChange={(e) => setProfileFields({ last_name_hira: e.target.value })}
            disabled={!isEnabled}
            id="last_name_hira"
            className="mb-4 lg:mb-0"
            placeholder="姓（かな）"
          />
        </div>

        <div>
          <EditProfileLabel required={isEnabled ? true : undefined}>名（かな）</EditProfileLabel>
          <TextField
            name="first_name_hira"
            value={profile.first_name_hira}
            onChange={(e) => setProfileFields({ first_name_hira: e.target.value })}
            disabled={!isEnabled}
            id="first_name_hira"
            placeholder="名（かな）"
          />
        </div>
      </div>
    </>
  );
};
