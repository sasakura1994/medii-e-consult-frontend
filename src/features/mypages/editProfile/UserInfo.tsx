import React from 'react';
import { TextField } from '@/components/Parts/Form/TextField';
import { useEditProfile } from './useEditProfile';

type Props = ReturnType<typeof useEditProfile>;

export const UserInfo: React.FC<Props> = ({ profile, setProfile }: Props) => {
  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 利用者情報</h3>
      <div className="mb-4 lg:flex lg:gap-6">
        <TextField
          name="last_name"
          value={profile.last_name}
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
          disabled={!isRegisterMode}
          id="last_name"
          className="mb-4 lg:mb-0"
          label="姓"
        />

        <TextField
          name="first_name"
          value={profile.first_name}
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
          disabled={!isRegisterMode}
          id="first_name"
          label="名"
        />
      </div>

      <div className="mb-4 lg:flex lg:gap-6">
        <TextField
          name="last_name_hira"
          value={profile.last_name_hira}
          onChange={(e) => setProfile({ ...profile, last_name_hira: e.target.value })}
          disabled={!isRegisterMode}
          id="last_name_hira"
          className="mb-4 lg:mb-0"
          label="姓（かな）"
        />

        <TextField
          name="first_name_hira"
          value={profile.first_name_hira}
          onChange={(e) => setProfile({ ...profile, first_name_hira: e.target.value })}
          disabled={!isRegisterMode}
          id="first_name_hira"
          label="名（かな）"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="birthday_year" className="mb-1 block font-bold">
          生年月日（半角）
        </label>
        <div className="flex gap-3">
          <TextField
            name="birthday_year"
            value={profile.birthday_year}
            onChange={(e) => setProfile({ ...profile, birthday_year: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_year"
            className="!w-32 lg:!w-40"
            subscript="年"
          />

          <TextField
            name="birthday_month"
            value={profile.birthday_month}
            onChange={(e) => setProfile({ ...profile, birthday_month: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_month"
            subscript="月"
          />

          <TextField
            name="birthday_day"
            value={profile.birthday_day}
            onChange={(e) => setProfile({ ...profile, birthday_day: e.target.value })}
            disabled={!isRegisterMode}
            id="birthday_day"
            subscript="日"
          />
        </div>
      </div>

      <div className="mb-4">
        <TextField
          name="graduated_university"
          id="graduated_university"
          label="卒業大学"
          placeholder="大学名"
          value={profile.graduated_university ?? ''}
          onChange={(e) => setProfile({ ...profile, graduated_university: e.target.value })}
        />
      </div>
    </div>
  );
};
