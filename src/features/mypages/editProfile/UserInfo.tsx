import React from 'react';
import { TextField } from '@/components/Parts/Form/TextField';
import { useEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';

type Props = ReturnType<typeof useEditProfile> & EditProfileProps;

export const UserInfo: React.FC<Props> = ({ isRegisterMode, profile, setProfileFields }: Props) => {
  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 利用者情報</h3>
      <div className="mb-4 lg:flex lg:gap-6">
        <div>
          <EditProfileLabel required={isRegisterMode ? true : undefined}>姓</EditProfileLabel>
          <TextField
            name="last_name"
            value={profile.last_name}
            onChange={(e) => setProfileFields({ ...profile, last_name: e.target.value })}
            disabled={!isRegisterMode}
            id="last_name"
            className="mb-4 lg:mb-0"
            label="姓"
          />
        </div>

        <div>
          <EditProfileLabel required={isRegisterMode ? true : undefined}>名</EditProfileLabel>
          <TextField
            name="first_name"
            value={profile.first_name}
            onChange={(e) => setProfileFields({ ...profile, first_name: e.target.value })}
            disabled={!isRegisterMode}
            id="first_name"
          />
        </div>
      </div>

      <div className="mb-4 lg:flex lg:gap-6">
        <div>
          <EditProfileLabel required={isRegisterMode ? true : undefined}>姓（かな）</EditProfileLabel>
          <TextField
            name="last_name_hira"
            value={profile.last_name_hira}
            onChange={(e) => setProfileFields({ ...profile, last_name_hira: e.target.value })}
            disabled={!isRegisterMode}
            id="last_name_hira"
            className="mb-4 lg:mb-0"
          />
        </div>

        <div>
          <EditProfileLabel required={isRegisterMode ? true : undefined}>名（かな）</EditProfileLabel>
          <TextField
            name="first_name_hira"
            value={profile.first_name_hira}
            onChange={(e) => setProfileFields({ ...profile, first_name_hira: e.target.value })}
            disabled={!isRegisterMode}
            id="first_name_hira"
          />
        </div>
      </div>

      <div className="mb-4">
        <EditProfileLabel required={isRegisterMode ? true : undefined}>生年月日（半角）</EditProfileLabel>
        <div className="flex gap-3">
          <TextField
            name="birthday_year"
            value={profile.birthday_year}
            onChange={(e) => setProfileFields({ ...profile, birthday_year: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_year"
            className="!w-32 lg:!w-40"
            subscript="年"
          />

          <TextField
            name="birthday_month"
            value={profile.birthday_month}
            onChange={(e) => setProfileFields({ ...profile, birthday_month: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_month"
            subscript="月"
          />

          <TextField
            name="birthday_day"
            value={profile.birthday_day}
            onChange={(e) => setProfileFields({ ...profile, birthday_day: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_day"
            subscript="日"
          />
        </div>
      </div>

      <div className="mb-4">
        <EditProfileLabel required={isRegisterMode ? false : undefined}>卒業大学</EditProfileLabel>
        <TextField
          name="graduated_university"
          id="graduated_university"
          label="卒業大学"
          disabled={!isRegisterMode}
          placeholder="大学名"
          value={profile.graduated_university ?? ''}
          onChange={(e) => setProfileFields({ ...profile, graduated_university: e.target.value })}
        />
      </div>
    </div>
  );
};
