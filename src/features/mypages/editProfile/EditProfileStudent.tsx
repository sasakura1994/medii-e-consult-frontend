import React from 'react';
import TextField from '@/components/TextField/TextField';
import { EditProfileLabel } from './EditProfileLabel';
import { UseEditProfile } from './useEditProfile';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

export const EditProfileStudent = (props: UseEditProfile) => {
  const { addBlurFields, blurFields, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  const hasError = blurFields.includes('graduated_university') && profile.graduated_university === '';

  return (
    <>
      <EditProfileLabel required>所属大学</EditProfileLabel>
      <div className="mt-2">
        <TextField
          name="graduated_university"
          value={profile.graduated_university ?? ''}
          onChange={(e) => setProfileFields({ graduated_university: e.target.value })}
          onBlur={() => addBlurFields('graduated_university')}
          className="w-full"
          hasError={hasError}
          required
        />
        {hasError && <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>}
      </div>
    </>
  );
};
