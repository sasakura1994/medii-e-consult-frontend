import React from 'react';
import { useEditProfile } from './useEditProfile';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import TextField from '@/components/TextField/TextField';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

type Props = Pick<
  ReturnType<typeof useEditProfile>,
  'addBlurFields' | 'blurFields' | 'profile' | 'setProfileFields'
> & {
  isEnabled: boolean;
};

export const UserInfoNames = (props: Props) => {
  const { addBlurFields, blurFields, isEnabled, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="lg:flex lg:gap-4">
        <div className="grow">
          <EditProfileLabel required={isEnabled ? true : undefined}>姓</EditProfileLabel>
          <TextField
            name="last_name"
            value={profile.last_name}
            onChange={(e) => setProfileFields({ last_name: e.target.value })}
            onBlur={() => addBlurFields('last_name')}
            disabled={!isEnabled}
            id="last_name"
            dataTestId="last_name"
            className="mb-4 w-full lg:mb-0"
            placeholder="姓"
            hasError={blurFields.includes('last_name') && profile.last_name === ''}
          />
          {blurFields.includes('last_name') && profile.last_name === '' && (
            <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>
          )}
        </div>

        <div className="grow">
          <EditProfileLabel required={isEnabled ? true : undefined}>名</EditProfileLabel>
          <TextField
            name="first_name"
            value={profile.first_name}
            onChange={(e) => setProfileFields({ first_name: e.target.value })}
            onBlur={() => addBlurFields('first_name')}
            disabled={!isEnabled}
            id="first_name"
            dataTestId="first_name"
            className="w-full"
            placeholder="名"
            hasError={blurFields.includes('first_name') && profile.first_name === ''}
          />
          {blurFields.includes('first_name') && profile.first_name === '' && (
            <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>
          )}
        </div>
      </div>

      <div className="mt-4 lg:flex lg:gap-4">
        <div className="grow">
          <EditProfileLabel required={isEnabled ? true : undefined}>姓（ふりがな）</EditProfileLabel>
          <TextField
            name="last_name_hira"
            value={profile.last_name_hira}
            onChange={(e) => setProfileFields({ last_name_hira: e.target.value })}
            onBlur={() => addBlurFields('last_name_hira')}
            disabled={!isEnabled}
            id="last_name_hira"
            dataTestId="last_name_hira"
            className="mb-4 w-full lg:mb-0"
            placeholder="姓（ふりがな）"
            hasError={blurFields.includes('last_name_hira') && profile.last_name_hira === ''}
          />
          {blurFields.includes('last_name_hira') && profile.last_name_hira === '' && (
            <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>
          )}
        </div>

        <div className="grow">
          <EditProfileLabel required={isEnabled ? true : undefined}>名（ふりがな）</EditProfileLabel>
          <TextField
            name="first_name_hira"
            value={profile.first_name_hira}
            onChange={(e) => setProfileFields({ first_name_hira: e.target.value })}
            onBlur={() => addBlurFields('first_name_hira')}
            disabled={!isEnabled}
            id="first_name_hira"
            dataTestId="first_name_hira"
            className="w-full"
            placeholder="名（ふりがな）"
            hasError={blurFields.includes('first_name_hira') && profile.first_name_hira === ''}
          />
          {blurFields.includes('first_name_hira') && profile.first_name_hira === '' && (
            <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>
          )}
        </div>
      </div>
    </>
  );
};
