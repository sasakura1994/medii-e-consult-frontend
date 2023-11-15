import React from 'react';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { useEditProfile } from './useEditProfile';
import { YearInput } from '@/components/Parts/Form/YearInput';
import { useEraConverter } from '@/hooks/useEraConverter';
import TextField from '@/components/TextField/TextField';

export type MedicalCareerProps = Pick<ReturnType<typeof useEditProfile>, 'profile' | 'setProfileFields'> & {
  isEnabled: boolean;
};

export const MedicalCareerQualifiedYear = (props: MedicalCareerProps) => {
  const { isEnabled, profile, setProfileFields } = props;
  const eraConverter = useEraConverter();

  if (!profile) {
    return <></>;
  }

  return (
    <div>
      <EditProfileLabel required={isEnabled ? true : undefined}>医師資格取得年</EditProfileLabel>
      {isEnabled ? (
        <YearInput
          {...eraConverter}
          value={Number(profile.qualified_year)}
          onChange={(value) => setProfileFields({ qualified_year: value.toString() })}
        />
      ) : (
        <div className="flex items-end gap-2">
          <TextField
            name="doctor_qualified_year"
            value={profile.qualified_year}
            disabled={true}
            id="doctor_qualified_year"
            dataTestId="doctor_qualified_year"
            className="!w-64"
            subText="年"
          />
        </div>
      )}
    </div>
  );
};
