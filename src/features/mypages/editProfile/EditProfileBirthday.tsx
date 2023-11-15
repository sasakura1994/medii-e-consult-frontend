import React from 'react';
import { EditProfileLabel } from './EditProfileLabel';
import { YearInput } from '@/components/Parts/Form/YearInput';
import { useEditProfile } from './useEditProfile';
import { useEraConverter } from '@/hooks/useEraConverter';
import TextField from '@/components/TextField/TextField';

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
          <div className="flex items-end">
            <TextField
              name="birthday_year"
              value={profile.birthday_year}
              onChange={(e) => setProfileFields({ birthday_year: e.target.value })}
              disabled={!isEnabled}
              id="birthday_year"
              dataTestId="birthday_year"
              className="!w-32 lg:!w-40"
            />
            <p className="ml-2">年</p>
          </div>
        )}

        <div className="flex items-end">
          <TextField
            name="birthday_month"
            value={profile.birthday_month}
            onChange={(e) => setProfileFields({ birthday_month: e.target.value })}
            disabled={!isEnabled}
            className="w-full"
            id="birthday_month"
            dataTestId="birthday_month"
          />
          <p className="ml-2">月</p>
        </div>

        <div className="flex items-end">
          <TextField
            name="birthday_day"
            value={profile.birthday_day}
            onChange={(e) => setProfileFields({ birthday_day: e.target.value })}
            disabled={!isEnabled}
            className="w-full"
            id="birthday_day"
            dataTestId="birthday_day"
          />
          <p className="ml-2">日</p>
        </div>
      </div>
    </>
  );
};
