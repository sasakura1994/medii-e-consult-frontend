import React from 'react';
import { EditProfileLabel } from './EditProfileLabel';
import { YearInput } from '@/components/Parts/Form/YearInput';
import { TextField } from '@/components/Parts/Form/TextField';
import { useEditProfile } from './useEditProfile';
import { useEraConverter } from '@/hooks/useEraConverter';

type Props = Pick<ReturnType<typeof useEditProfile>, 'profile' | 'setProfileFields'> & {
  isEnabled: boolean;
};

export const EditProfileBirthday = (props: Props) => {
  const { isEnabled, profile, setProfileFields } = props;
  const eraConverter = useEraConverter();

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <EditProfileLabel required={isEnabled ? true : undefined}>生年月日（半角）</EditProfileLabel>
      <div className="flex gap-3">
        {isEnabled ? (
          <YearInput
            {...eraConverter}
            value={Number(profile.birthday_year)}
            onChange={(value) => setProfileFields({ birthday_year: value.toString() })}
          />
        ) : (
          <TextField
            name="birthday_year"
            value={profile.birthday_year}
            onChange={(e) => setProfileFields({ birthday_year: e.target.value })}
            disabled={!isEnabled}
            id="birthday_year"
            className="!w-32 lg:!w-40"
            subscript="年"
          />
        )}

        <TextField
          name="birthday_month"
          value={profile.birthday_month}
          onChange={(e) => setProfileFields({ birthday_month: e.target.value })}
          disabled={!isEnabled}
          id="birthday_month"
          subscript="月"
        />

        <TextField
          name="birthday_day"
          value={profile.birthday_day}
          onChange={(e) => setProfileFields({ birthday_day: e.target.value })}
          disabled={!isEnabled}
          id="birthday_day"
          subscript="日"
        />
      </div>
    </>
  );
};
