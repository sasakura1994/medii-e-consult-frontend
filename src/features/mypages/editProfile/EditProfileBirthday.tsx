import React, { useMemo } from 'react';
import { EditProfileLabel } from './EditProfileLabel';
import { useEditProfile } from './useEditProfile';
import { DateField } from '@/components/Form/DateField';

type Props = Pick<ReturnType<typeof useEditProfile>, 'profile' | 'setProfileFields'> & {
  isEnabled: boolean;
};

export const EditProfileBirthday = (props: Props) => {
  const { isEnabled, profile, setProfileFields } = props;
  const birthday = useMemo(() => {
    if (!profile) {
      return undefined;
    }
    return new Date(Number(profile.birthday_year), Number(profile.birthday_month) - 1, Number(profile.birthday_day));
  }, [profile]);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <EditProfileLabel required={isEnabled ? true : undefined}>生年月日</EditProfileLabel>
      <DateField
        value={birthday}
        onChange={(fullDate: string) => {
          if (fullDate === '') {
            return;
          }

          const parts = fullDate.split(/-/);
          setProfileFields({
            birthday_year: Number(parts[0]).toString(),
            birthday_month: Number(parts[1]).toString(),
            birthday_day: Number(parts[2]).toString(),
          });
        }}
        disabled={!isEnabled}
      />
    </>
  );
};
